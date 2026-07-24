import pandas as pd
from pymongo import MongoClient

# Excel file વાંચો
df = pd.read_excel("crop_database.xlsx")

# JSON બનાવો
df.to_json(
    "crop_knowledge.json",
    orient="records",
    indent=4,
    force_ascii=False
)
print("JSON file created successfully!")

# MongoDB માં ડેટા અપલોડ કરો
try:
    print("Connecting to MongoDB...")
    # MongoDB ક્લાયંટ કનેક્ટ કરો
    client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=2000)
    db = client["crop_db"]
    collection = db["crops"]

    # Excel ના ડેટામાંથી NaN/None સાફ કરો (જેથી MongoDB માં પ્રોબ્લેમ ન થાય)
    df_clean = df.replace({pd.NA: None})
    df_clean = df_clean.where(pd.notnull(df_clean), None)
    records = df_clean.to_dict(orient='records')

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
