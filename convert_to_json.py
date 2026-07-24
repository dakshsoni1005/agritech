import pandas as pd
import re
from pymongo import MongoClient

# Excel file વાંચો (પ્રથમ ટાઇટલ રો સ્કીપ કરવા માટે skiprows=1 વાપરો)
df = pd.read_excel("crop_database.xlsx", skiprows=1)

# Excel ના ડેટામાંથી NaN/None સાફ કરો (જેથી JSON અને MongoDB માં પ્રોબ્લેમ ન થાય)
df_clean = df.replace({pd.NA: None})
df_clean = df_clean.where(pd.notnull(df_clean), None)

# દરેક પાક માટે Crop ID જનરેટ કરો
records = []
for idx, row in df_clean.iterrows():
    record = row.to_dict()
    crop_name = record.get("Crop Name", "")
    if crop_name:
        # સ્પેશિયલ કેરેક્ટર દૂર કરો અને સ્પેસની જગ્યાએ અંડરસ્કોર મૂકો
        crop_id = re.sub(r'[^a-zA-Z0-9\s]', '', crop_name).strip().lower().replace(' ', '_')
        record["Crop ID"] = crop_id
    records.append(record)

# JSON બનાવો
import json
with open("crop_knowledge.json", "w", encoding="utf-8") as f:
    json.dump(records, f, indent=4, ensure_ascii=False)

print("JSON file created successfully with clean headers and Crop IDs!")

# MongoDB માં ડેટા અપલોડ કરો
try:
    print("Connecting to MongoDB...")
    # MongoDB ક્લાયંટ કનેક્ટ કરો
    client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=2000)
    db = client["crop_db"]
    collection = db["crops"]

    # ડેટાને MongoDB માં અપડેટ (Upsert) કરો
    inserted_count = 0
    updated_count = 0
    
    for record in records:
        crop_id = record.get("Crop ID")
        if crop_id:
            # Crop ID ના આધારે ડેટા રિપ્લેસ/અપડેટ કરો (ડુપ્લિકેટ અટકાવવા માટે)
            result = collection.update_one(
                {"Crop ID": crop_id},
                {"$set": record},
                upsert=True
            )
            if result.matched_count > 0:
                updated_count += 1
            else:
                inserted_count += 1
        else:
            collection.insert_one(record)
            inserted_count += 1

    print(f"MongoDB Upload Success: {inserted_count} records inserted, {updated_count} records updated!")

except Exception as e:
    print(f"MongoDB Upload Error: {e}")
    print("કૃપા કરીને ચેક કરો કે MongoDB સર્વિસ ચાલુ છે.")

