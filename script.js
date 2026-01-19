const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const word = input.value.trim();
  resultDiv.innerHTML = "";
  errorDiv.textContent = "";

  if (!word) {
    errorDiv.textContent = "Please enter a word.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    const entry = data[0];

    const meaning = entry.meanings[0];
    const definition = meaning.definitions[0].definition;
    const partOfSpeech = meaning.partOfSpeech;
    const synonyms = meaning.definitions[0].synonyms || [];

    const pronunciation = entry.phonetics[0].text;

    resultDiv.innerHTML = `
      <div class="result-word">${entry.word}</div>
      <p><strong>Pronunciation:</strong> ${pronunciation}</p>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p><strong>Definition:</strong> ${definition}</p>
      <p><strong>Synonyms:</strong> ${synonyms.length ? synonyms.join(", ") : "None"}</p>
    `;
  } catch (error) {
    errorDiv.textContent = "Sorry, the word could not be found.";
  }
});
