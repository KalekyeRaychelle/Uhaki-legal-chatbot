
import chromadb
import os

# Resolve the database relative to this script's location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_PATH = os.path.join(SCRIPT_DIR, "chroma")
COLLECTION_NAME = "actSectionsV2"

print("Database path:", CHROMA_PATH)
print("Database exists:", os.path.exists(CHROMA_PATH))

client = chromadb.PersistentClient(path=CHROMA_PATH)

print("\nAvailable collections:")
for col in client.list_collections():
    print("-", col.name)

collection = client.get_collection(name=COLLECTION_NAME)

print("\nCollection:", collection.name)
print("Record count:", collection.count())
print("Metadata:", collection.metadata)

try:
    config = collection.configuration
    print("\nCollection configuration:")
    print(config)

    hnsw_config = config.get("hnsw", {})
    print("\nHNSW configuration:")
    print(hnsw_config)

    print("\nDistance metric:", hnsw_config.get("space", "Not exposed"))
except Exception as e:
    print("\nCould not read configuration:", e)
