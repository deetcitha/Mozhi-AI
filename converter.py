from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

text = "vanakkam nanbargale"

tamil_text = transliterate(
    text,
    sanscript.ITRANS,
    sanscript.TAMIL
)

with open("output.txt", "w", encoding="utf-8") as f:
    f.write(tamil_text)

print("Saved to output.txt")