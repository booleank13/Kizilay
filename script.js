document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch the map and inject it
    // SVG is now embedded in HTML, so we just attach events.
    attachMapEvents();

    function attachMapEvents() {
        const promptText = document.getElementById('prompt-text');
        const donateBtn = document.getElementById('donate-btn');
        const logo = document.getElementById('kizilay-logo');

        // Select all potential interactive elements:
        // 1. Groups with data-plate
        // 2. Any element with ID starting with TR- (path, circle, rect, etc.)
        const interactiveElements = document.querySelectorAll('#map-container svg g[data-plate], #map-container svg [id^="TR-"]');

        interactiveElements.forEach(el => {
            el.addEventListener('click', (e) => {
                // Determine Plate
                let plate = el.getAttribute('data-plate');
                if (!plate && el.id) {
                    // Try to parse TR-XX
                    const match = el.id.match(/TR-(\d+)/);
                    if (match) plate = match[1];
                }

                if (!plate) return;

                // Handle Selection Visuals
                // Clear previous selections
                interactiveElements.forEach(item => {
                    item.classList.remove('selected');
                    // For group based, also clean children
                    if (item.tagName === 'g') {
                         const children = item.querySelectorAll('*');
                         children.forEach(c => c.classList.remove('selected'));
                    }
                });

                // Add selection class
                if (el.tagName === 'g') {
                    el.classList.add('selected'); // mark group
                    const children = el.querySelectorAll('*');
                    children.forEach(c => c.classList.add('selected'));
                } else {
                    el.classList.add('selected');
                }

                // Update UI
                const cityName = getCityName(plate);
                promptText.innerHTML = `${cityName} aş evine sen de katkıda bulun`;

                logo.style.display = 'block';
                donateBtn.style.display = 'inline-block';
            });

            // Mouse pointer style is handled in CSS
        });
    }

    function getCityName(plate) {
        // Ensure plate is string and padded if needed (e.g. "1" -> "01" for lookup)
        let plateKey = plate.toString();
        if (plateKey.length === 1) plateKey = "0" + plateKey;

        const plates = {
            "01": "Adana", "02": "Adıyaman", "03": "Afyonkarahisar", "04": "Ağrı", "05": "Amasya",
            "06": "Ankara", "07": "Antalya", "08": "Artvin", "09": "Aydın", "10": "Balıkesir",
            "11": "Bilecik", "12": "Bingöl", "13": "Bitlis", "14": "Bolu", "15": "Burdur",
            "16": "Bursa", "17": "Çanakkale", "18": "Çankırı", "19": "Çorum", "20": "Denizli",
            "21": "Diyarbakır", "22": "Edirne", "23": "Elazığ", "24": "Erzincan", "25": "Erzurum",
            "26": "Eskişehir", "27": "Gaziantep", "28": "Giresun", "29": "Gümüşhane", "30": "Hakkari",
            "31": "Hatay", "32": "Isparta", "33": "Mersin", "34": "İstanbul", "35": "İzmir",
            "36": "Kars", "37": "Kastamonu", "38": "Kayseri", "39": "Kırklareli", "40": "Kırşehir",
            "41": "Kocaeli", "42": "Konya", "43": "Kütahya", "44": "Malatya", "45": "Manisa",
            "46": "Kahramanmaraş", "47": "Mardin", "48": "Muğla", "49": "Muş", "50": "Nevşehir",
            "51": "Niğde", "52": "Ordu", "53": "Rize", "54": "Sakarya", "55": "Samsun",
            "56": "Siirt", "57": "Sinop", "58": "Sivas", "59": "Tekirdağ", "60": "Tokat",
            "61": "Trabzon", "62": "Tunceli", "63": "Şanlıurfa", "64": "Uşak", "65": "Van",
            "66": "Yozgat", "67": "Zonguldak", "68": "Aksaray", "69": "Bayburt", "70": "Karaman",
            "71": "Kırıkkale", "72": "Batman", "73": "Şırnak", "74": "Bartın", "75": "Ardahan",
            "76": "Iğdır", "77": "Yalova", "78": "Karabük", "79": "Kilis", "80": "Osmaniye", "81": "Düzce"
        };
        return plates[plateKey] || "Türkiye";
    }
});
