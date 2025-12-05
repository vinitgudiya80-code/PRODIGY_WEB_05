# Weather App (Simple)

हे एखादं साधं वेदर वेब अॅप आहे — तुमची लोकेशन किंवा एखादा शहराचे नाव देऊन सध्याच्या हवामानाची माहिती घेते.

## काय मिळेल
- करंट तापमान (°C)
- हवामान वर्णन (main + description)
- feels like, humidity, wind speed, pressure
- sunrise / sunset (local time approximation)

## वापरण्याची पद्धत
1. OpenWeatherMap (https://openweathermap.org/) वर फ्री अकाउंट बनवा आणि API key घ्या.
2. `script.js` मध्ये `API_KEY = 'API_KEY'` ही जागा तुम्हाला मिळालेला API key ने बदला.
3. `index.html` फाईल ब्राउझरमध्ये उघडा (कोणत्याही लोकल सर्व्हरवर ठेवल्यास आदर्श).
4. "Use My Location" वापरून तुमच्या ब्राउझरच्या लोकेशन परवानगीला परवानगी द्या, किंवा सिटी सर्च बॉक्समध्ये शहराचे नाव द्या.

## लक्षात ठेवा
- फ्री खाते वापरताना rate limits असू शकतात.
- CORS किंवा ब्राउझर सुरक्षा धोरणांमुळे काही सेटअप मध्ये लोकल सर्व्हर (उदा. `npx http-server` किंवा `python -m http.server`) वापरणे आवश्यक असू शकते.

## फाइल्स
- index.html
- styles.css
- script.js
- README.md

आवडले तर मी याला आणखी फीचर्स देऊ शकतो: 5-दिवसीय फोरकास्ट, unit toggle (°C/°F), localStorage मध्ये शेवटचा सिटी स्टोअर करणे वगैरे.
