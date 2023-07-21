// Get Quotes from API

function newQuote(data) {
  return data[Math.floor(Math.random() * data.length)];
}

function validAuthor(quote) {
  if (!quote.author) {
    return "Unknown Author";
  }
  return quote.author;
}

function isLongText(quoteData, quoteText) {
  if (!quoteData || !quoteText) {
    quoteText.classList.remove("long-quote");
    return "No Text for Quote";
  }
  if (quoteData.text.length > 100) {
    quoteText.classList.add("long-quote");
    return quoteData.text;
  }
  quoteText.classList.remove("long-quote");
  return quoteData.text;
}

async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const res = await fetch(apiUrl);
    return await res.json();
  } catch (error) {
    console.log(`Error  with api: ${error}`);
  }
}

//On Load
async function onLoad() {
  const newQuoteBtn = document.querySelector("#new-quote");
  const author = document.querySelector("#author");
  const quote = document.querySelector("#quote");

  const data = await getQuotes();

  const randomQuote = newQuote(data);

  quote.textContent = isLongText(randomQuote, quote);

  author.textContent = validAuthor(randomQuote);

  newQuoteBtn.addEventListener("click", () => {
    const newRandomQuote = newQuote(data);
    quote.textContent = isLongText(newRandomQuote, quote);

    author.textContent = validAuthor(newRandomQuote);
  });
}

onLoad();
