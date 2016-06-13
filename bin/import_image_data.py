import sys
import zipfile
from pymongo import MongoClient
from PIL import Image

def parse_image_metadata(zip_file_path):
    image_dict = {}
    category_list = []

    with zipfile.ZipFile(zip_file_path) as zip_file:
        for file_name in zip_file.namelist(): 
            if not file_name.endswith('_r1.txt') and file_name != 'README.txt':  
                category = file_name.split('.')[0]
                category_list.append({"name": category, "display_name": category.title(), "parent": ""})
                with zip_file.open(file_name) as f:
                    for line in f:
                        line = line.strip()
                        with Image.open("images/im" + line + ".jpg") as im:
                            width, height = im.size
                            image_dict.setdefault(line, {"thumbnail_url":"images/thumbs/im" + line + ".jpg", "download_url": "images/im" + line + ".jpg", "width": width, "height": height, "categories":[]})["categories"].append(category)

    return (image_dict.values(), category_list)

def write_to_db(image_list, category_list):
    client = MongoClient('mongodb://localhost:27017/')
    db = client.yfcc100m
    images = db.images
    categories = db.categories

    images.delete_many({})
    categories.delete_many({})

    for category in category_list:
        categories.insert_one(category)

    for image in image_list:
        images.insert_one(image)

if __name__ == '__main__':
    image_list, category_list = parse_image_metadata(sys.argv[1])
    write_to_db(image_list, category_list)