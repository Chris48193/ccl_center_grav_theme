import 'scss/map.scss'
import L from 'leaflet'
import MapData from 'json/partners.geo.json'

const map = new L.Map('partner-map', {
    center: [52, 12],
    zoom: 4.0,
    minZoom: 1,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    scrollWheelZoom: false,
})

const icon = marker => {
    let classes = marker.classes

    return new L.divIcon({
        className: `map-icon ${marker.color} ${classes}`,
        iconSize: [15, 15],
    })
}

const onMarkerClick = marker => () => {
    // window.location = marker.url != '' ? marker.url : '#'
    $(`#${marker.acronym}`).foundation('open')
}

// Base layer
L.geoJson(MapData, {
    interactive: false,
    style: function(feature) {

        var colorize = countries_iso_3.includes(feature.properties.iso_a3) ? true : false;

        return {
            color: '#dedede',
            weight: 1,
            opacity: 0.9,
            fillOpacity: 1,
            fillColor: colorize ? '#0a678d' : '#bfbfbf'
        }
    },
}).addTo(map)

// Markers
markers.forEach(marker => {
    if (marker.lat && marker.lon) {

        let tooltip = null;

        if (marker.acronym) {
            tooltip = `${marker.acronym} - ${marker.name}`;
        } else {
            tooltip = marker.name;
        }

        if(marker.flag && marker.country) {
            tooltip = `
                <div>
                    <i class="fi fi-${marker.flag}"></i>
                    ${marker.country}
                </div>
                <div>
                    ${tooltip}
                </div>
                `
        }

        L.marker([marker.lat, marker.lon], {
            riseOnHover: true,
            icon: icon(marker),
        })
            .bindTooltip(tooltip)
            .on('click', onMarkerClick(marker))
            .addTo(map)
    }
})