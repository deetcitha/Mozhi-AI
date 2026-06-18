import easyocr

reader = easyocr.Reader(['en'])

image_path = r"C:\Users\ksamy\OneDrive\Desktop\Tamiloli-AI\backend\sample.jpg"

result = reader.readtext(image_path)

for item in result:
    print(item[1])