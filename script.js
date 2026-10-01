/* =====================================================
   RADISAFE 360
   ===================================================== */


/* =====================================================
   STATE DATA
   ===================================================== */

const stateData = {

    "Andhra Pradesh": {
        level: "Less",
        score: 46
    },

    "Arunachal Pradesh": {
        level: "Less",
        score: 35
    },

    "Assam": {
        level: "Moderate",
        score: 52
    },

    "Bihar": {
        level: "Moderate",
        score: 61
    },

    "Chhattisgarh": {
        level: "Moderate",
        score: 60
    },

    "Goa": {
        level: "Less",
        score: 35
    },

    "Gujarat": {
        level: "High",
        score: 79
    },

    "Haryana": {
        level: "Moderate",
        score: 57
    },

    "Himachal Pradesh": {
        level: "Less",
        score: 38
    },

    "Jharkhand": {
        level: "High",
        score: 73
    },

    "Karnataka": {
        level: "Moderate",
        score: 62
    },

    "Kerala": {
        level: "Less",
        score: 41
    },

    "Madhya Pradesh": {
        level: "Moderate",
        score: 59
    },

    "Maharashtra": {
        level: "High",
        score: 82
    },

    "Manipur": {
        level: "Less",
        score: 37
    },

    "Meghalaya": {
        level: "Less",
        score: 32
    },

    "Mizoram": {
        level: "Less",
        score: 30
    },

    "Nagaland": {
        level: "Less",
        score: 36
    },

    "Odisha": {
        level: "Moderate",
        score: 67
    },

    "Punjab": {
        level: "Less",
        score: 44
    },

    "Rajasthan": {
        level: "Less",
        score: 39
    },

    "Sikkim": {
        level: "Less",
        score: 31
    },

    "Tamil Nadu": {
        level: "Moderate",
        score: 58
    },

    "Telangana": {
        level: "Moderate",
        score: 68
    },

    "Tripura": {
        level: "Less",
        score: 34
    },

    "Uttar Pradesh": {
        level: "High",
        score: 76
    },

    "Uttarakhand": {
        level: "Less",
        score: 30
    },

    "West Bengal": {
        level: "Moderate",
        score: 64
    },

    "Delhi": {
        level: "High",
        score: 85
    },

    "Jammu and Kashmir": {
        level: "Less",
        score: 40
    },

    "Ladakh": {
        level: "Less",
        score: 36
    },

    "Andaman and Nicobar Islands": {
        level: "Less",
        score: 33
    },

    "Chandigarh": {
        level: "Moderate",
        score: 55
    },

    "Dadra and Nagar Haveli and Daman and Diu": {
        level: "Less",
        score: 42
    },

    "Lakshadweep": {
        level: "Less",
        score: 29
    },

    "Puducherry": {
        level: "Moderate",
        score: 53
    }

};


/* =====================================================
   ANALYSIS POPUP
   ===================================================== */

function openAnalysis() {

    const state =
        document.getElementById("stateSelect").value;


    if (state === "") {

        alert("Please select your state first.");

        return;

    }


    const data =
        stateData[state] || {
            level: "Moderate",
            score: 60
        };


    document.getElementById("modalTitle")
        .textContent =
        state + " Analysis";


    document.getElementById("status")
        .textContent =
        data.level;


    document.getElementById("score")
        .textContent =
        data.score;


    document.getElementById("reading")
        .textContent =
        data.level;


    document.getElementById("summary")
        .textContent =
        "A state-level radiation overview for " +
        state + ".";


    document.getElementById("meaning")
        .textContent =
        "The selected state is currently classified as " +
        data.level.toLowerCase() +
        " in this demo dashboard. " +
        "Final radiation values should be connected to verified data.";


    /*
       Open popup
    */

    document.getElementById("analysisModal")
        .classList.add("show");

}


/* =====================================================
   CLOSE ANALYSIS
   ===================================================== */

function closeAnalysis() {

    document.getElementById("analysisModal")
        .classList.remove("show");

}


/* =====================================================
   REAL INDIA MAP
   ===================================================== */


/*
   GeoJSON containing real India state boundaries.
*/

const INDIA_GEOJSON =
    "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@main/geojson/india.geojson";


let indiaMap = null;

let indiaLayer = null;

let selectedMarker = null;


/* =====================================================
   INITIALIZE MAP
   ===================================================== */

function initializeMap() {

    if (indiaMap !== null) {

        return;

    }


    indiaMap =
        L.map("indiaMap", {

            zoomControl: true,

            scrollWheelZoom: true,

            minZoom: 4,

            maxZoom: 8

        });


    /*
       Geographic map background.
    */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {

            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"

        }
    ).addTo(indiaMap);


    /*
       Load actual India state boundaries.
    */

    fetch(INDIA_GEOJSON)

        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Could not load India GeoJSON."
                );

            }

            return response.json();

        })

        .then(function(data) {

            createIndiaMap(data);

        })

        .catch(function(error) {

            console.error(error);

            alert(
                "Map could not load. Please check your internet connection."
            );

        });

}


/* =====================================================
   GET STATE NAME
   ===================================================== */

function getStateName(feature) {

    const p =
        feature.properties || {};


    return (

        p.st_nm ||

        p.ST_NM ||

        p.State_Name ||

        p.STATE ||

        p.state ||

        p.NAME_1 ||

        p.name ||

        p.Name ||

        ""

    );

}


/* =====================================================
   CREATE INDIA MAP
   ===================================================== */

function createIndiaMap(data) {

    indiaLayer =

        L.geoJSON(

            data,

            {

                /*
                   Every state starts neutral.
                */

                style: {

                    color: "#71868b",

                    weight: 1.2,

                    fillColor: "#26383e",

                    fillOpacity: 0.80

                },


                /*
                   Add hover and click behaviour.
                */

                onEachFeature:
                    function(feature, layer) {

                        const state =
                            getStateName(feature);


                        layer.on(
                            "mouseover",
                            function() {

                                layer.setStyle({

                                    weight: 2,

                                    color: "#ffffff",

                                    fillOpacity: 0.95

                                });

                            }
                        );


                        layer.on(
                            "mouseout",
                            function() {

                                const selected =
                                    document
                                        .getElementById(
                                            "stateSelect"
                                        )
                                        .value;


                                if (
                                    normalize(state) !==
                                    normalize(selected)
                                ) {

                                    layer.setStyle({

                                        color: "#71868b",

                                        weight: 1.2,

                                        fillColor: "#26383e",

                                        fillOpacity: 0.80

                                    });

                                }

                            }
                        );


                        /*
                           Clicking a state on the map
                           selects that state.
                        */

                        layer.on(
                            "click",
                            function() {

                                selectMapState(
                                    state
                                );

                            }
                        );

                    }

            }

        ).addTo(indiaMap);


    /*
       Automatically fit the map to India.
    */

    indiaMap.fitBounds(
        indiaLayer.getBounds(),
        {
            padding: [25, 25]
        }
    );


    /*
       Highlight selected state.
    */

    const selected =
        document.getElementById(
            "stateSelect"
        ).value;


    if (selected !== "") {

        highlightState(selected);

    }

}


/* =====================================================
   SHOW MAP
   ===================================================== */

function showMap() {

    const selected =
        document.getElementById(
            "stateSelect"
        ).value;


    if (selected === "") {

        alert(
            "Please select a state first."
        );

        return;

    }


    /*
       Close analysis popup.
    */

    closeAnalysis();


    /*
       Display map.
    */

    document
        .getElementById("mapSection")
        .classList.add("show");


    /*
       Move to map.
    */

    document
        .getElementById("mapSection")
        .scrollIntoView({
            behavior: "smooth"
        });


    /*
       Wait until map container is visible.
    */

    setTimeout(function() {

        initializeMap();


        setTimeout(function() {

            highlightState(selected);

            indiaMap.invalidateSize();

        }, 800);

    }, 300);

}


/* =====================================================
   HIGHLIGHT ONLY SELECTED STATE
   ===================================================== */

function highlightState(selectedState) {

    if (indiaLayer === null) {

        return;

    }


    /*
       IMPORTANT:
       First make every state neutral.
    */

    indiaLayer.eachLayer(
        function(layer) {

            layer.setStyle({

                color: "#71868b",

                weight: 1.2,

                fillColor: "#26383e",

                fillOpacity: 0.80

            });

        }
    );


    /*
       Remove old pin.
    */

    if (selectedMarker !== null) {

        indiaMap.removeLayer(
            selectedMarker
        );

        selectedMarker = null;

    }


    let selectedLayer = null;


    /*
       Find the selected state.
    */

    indiaLayer.eachLayer(
        function(layer) {

            const state =
                getStateName(
                    layer.feature
                );


            if (
                normalize(state) ===
                normalize(selectedState)
            ) {

                selectedLayer = layer;

            }

        }
    );


    if (selectedLayer === null) {

        console.log(
            "State not found:",
            selectedState
        );

        return;

    }


    /*
       Get radiation information.
    */

    const data =
        stateData[selectedState] || {

            level: "Moderate",

            score: 60

        };


    /*
       Choose colour.
    */

    let colour = "#43e6a5";


    if (data.level === "Moderate") {

        colour = "#ffad45";

    }


    if (data.level === "High") {

        colour = "#ff6978";

    }


    /*
       ONLY the selected state is coloured.
    */

    selectedLayer.setStyle({

        color: "#ffffff",

        weight: 3,

        fillColor: colour,

        fillOpacity: 0.95

    });


    selectedLayer.bringToFront();


    /*
       Find the geographical centre
       of the selected state.
    */

    const center =
        selectedLayer
            .getBounds()
            .getCenter();


    /* =================================================
       CREATE PIN
       ================================================= */

    const pinIcon =

        L.divIcon({

            className: "pin-wrapper",

            html:
                "<div class='radiation-pin'>📌</div>",

            iconSize: [40, 40],

            iconAnchor: [20, 38]

        });


    selectedMarker =

        L.marker(
            center,
            {
                icon: pinIcon,

                zIndexOffset: 1000
            }
        )
        .addTo(indiaMap);


    /*
       Popup attached to pin.
    */

    selectedMarker.bindPopup(

        "<div style='text-align:center'>" +

        "<strong>" +
        selectedState +
        "</strong>" +

        "<br><br>" +

        "Radiation Level: " +

        "<b>" +
        data.level +
        "</b>" +

        "<br>" +

        "Radiation Index: " +

        "<b>" +
        data.score +
        "</b>" +

        "</div>"

    ).openPopup();


    /*
       Zoom towards selected state.
    */

    indiaMap.flyTo(
        center,
        6,
        {
            duration: 1
        }
    );


    /*
       Update map information.
    */

    document.getElementById(
        "selectedMapState"
    ).textContent =
        "Radiation status for " +
        selectedState;


    document.getElementById(
        "mapStateName"
    ).textContent =
        selectedState;


    document.getElementById(
        "mapStateLevel"
    ).textContent =
        data.level;


    document.getElementById(
        "mapStateLevel"
    ).style.color =
        colour;

}


/* =====================================================
   NORMALIZE STATE NAMES
   ===================================================== */

function normalize(value) {

    return String(value)
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\s+/g, " ")
        .trim();

}


/* =====================================================
   SELECT STATE BY CLICKING MAP
   ===================================================== */

function selectMapState(stateName) {

    if (!stateName) {

        return;

    }


    const select =
        document.getElementById(
            "stateSelect"
        );


    /*
       Try to find the state in dropdown.
    */

    for (
        let i = 0;
        i < select.options.length;
        i++
    ) {

        if (
            normalize(
                select.options[i].value
            ) ===
            normalize(stateName)
        ) {

            select.selectedIndex = i;

            break;

        }

    }


    /*
       Update map.
    */

    highlightState(stateName);

}


/* =====================================================
   BACK TO HOME
   ===================================================== */

function backToHome() {

    document
        .getElementById("mapSection")
        .classList.remove("show");


    document
        .getElementById("home")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   CLOSE MODAL BY CLICKING OUTSIDE
   ===================================================== */

document
    .getElementById("analysisModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeAnalysis();

            }

        }
    );


/* =====================================================
   AWARENESS CENTER - NEW CODE ONLY
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const awarenessTabs =
        document.querySelectorAll(".awareness-tab");

    const awarenessPanels =
        document.querySelectorAll(".awareness-panel");

    awarenessTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const target =
                tab.getAttribute("data-awareness-tab");

            awarenessTabs.forEach(function (item) {
                item.classList.remove("active");
            });

            awarenessPanels.forEach(function (panel) {
                panel.classList.remove("active");
            });

            tab.classList.add("active");

            const panel =
                document.querySelector(
                    '[data-awareness-panel="' + target + '"]'
                );

            if (panel) {
                panel.classList.add("active");
            }

        });

    });

});


/* =====================================================
   MAP NAVIGATION FIX - DOES NOT MODIFY MAP
   ===================================================== */

function openMapFromNav(event) {

    if (event) {
        event.preventDefault();
    }

    const select =
        document.getElementById("stateSelect");

    const selected =
        select ? select.value : "";

    if (selected === "") {

        alert("Please select a state first.");

        document
            .getElementById("home")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;
    }

    showMap();

}

/* =====================================================
   FUTURE PREDICTION PAGE
   ===================================================== */

function openFuturePrediction() {

    const select = document.getElementById("stateSelect");
    const selected = select ? select.value : "";

    if (selected === "") {
        alert("Please select a state first.");
        return;
    }

    window.location.href =
        "future-prediction.html?state=" +
        encodeURIComponent(selected);

}
