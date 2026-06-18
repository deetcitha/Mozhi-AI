

CORRECTION_DICTIONARY = {
    "vanakkam": "வணக்கம்",
    "nanbargale": "நண்பர்களே",
    "nandri": "நன்றி",
    "tamil": "தமிழ்",
    "amma": "அம்மா",
    "appa": "அப்பா",
    "naan": "நான்",
    "nee": "நீ",
    "avan": "அவன்",
    "aval": "அவள்",
    "ungal": "உங்கள்",
    "kalloori": "கல்லூரி",
    "selgiren": "செல்கிறேன்",
    "indru": "இன்று"
}


def transliterate_tanglish(text):
    words = text.lower().split()
    tamil_words = []

    for word in words:
        tamil_words.append(
            CORRECTION_DICTIONARY.get(word, word)
        )

    return " ".join(tamil_words)



if __name__ == "__main__":
    text = "vanakkam nanbargale"
    result = transliterate_tanglish(text)

print("Tanglish :", text)
print("Tamil    :", result)

with open("tamil_output.txt", "w", encoding="utf-8") as f:
    f.write(result)

print("Saved to tamil_output.txt")