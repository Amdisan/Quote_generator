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

function loadinSpinnerToggle(loaderEl, quoteContainer) {
  const loaderElHiddenAttr = loaderEl.hidden;
  const quoteContainerHiddenAttr = quoteContainer.hidden;

  if (!quoteContainerHiddenAttr && !loaderElHiddenAttr) {
    return {
      loaderElHidden: false,
      quoteContainerHidden: true,
    };
  }
  if (!loaderElHiddenAttr && quoteContainerHiddenAttr) {
    return {
      loaderElHidden: true,
      quoteContainerHidden: false,
    };
  }
  if (loaderElHiddenAttr && !quoteContainerHiddenAttr) {
    return {
      loaderElHidden: false,
      quoteContainerHidden: true,
    };
  }
  console.log("Something wrong with loader");
  return {
    loaderElHidden: false,
    quoteContainerHidden: false,
  };
}

//On Load
async function onLoad() {
  const newQuoteBtn = document.querySelector("#new-quote");
  const author = document.querySelector("#author");
  const quote = document.querySelector("#quote");
  const twitterBtn = document.querySelector("#twitter");
  const loader = document.querySelector("#loader");
  const quoteContainer = document.querySelector("#quote-container");

  let toggleSpinner = loadinSpinnerToggle(loader, quoteContainer);
  loader.hidden = toggleSpinner.loaderElHidden;
  quoteContainer.hidden = toggleSpinner.quoteContainerHidden;

  const data = await getQuotes();
  const randomQuote = newQuote(data);

  toggleSpinner = loadinSpinnerToggle(loader, quoteContainer);
  loader.hidden = toggleSpinner.loaderElHidden;
  quoteContainer.hidden = toggleSpinner.quoteContainerHidden;

  quote.textContent = isLongText(randomQuote, quote);
  author.textContent = validAuthor(randomQuote);

  newQuoteBtn.addEventListener("click", () => {
    const newRandomQuote = newQuote(data);
    quote.textContent = isLongText(newRandomQuote, quote);
    author.textContent = validAuthor(newRandomQuote);
  });

  twitterBtn.addEventListener("click", async () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}$`;
    window.open(twitterUrl, "_blank");
  });
}

onLoad();
