
const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {renderCountryCard(entry)})
}, { threshold: 0.2 });

observer.observe(refs.container);
        

