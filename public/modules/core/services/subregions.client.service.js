/*global angular*/
'use strict';

angular.module('core').factory('Subregions', ['_',
function(_) {

  var Subregions = [{
    "id": "55561764eb0810683cd40c4b",
    "audio":[],
    "description":"En el sector de la Cordillera Oriental encontramos el paisaje de las quebradas, siendo las tres principales la de Humahuaca, en la provincia de Jujuy y la del Toro y Calchaquí en la provincia de Salta. Las quebradas nacen en la Puna a unos 3500 m. de altura y descienden hacia los valles. El clima presenta escasas precipitaciones 80 a 200 mm anuales, concentrándose en los meses de verano y elevada amplitud térmica. El verano es cálido y los inviernos fríos. Entre las plantas más características del lugar encontramos el cardón, la queñoa y el churqui, que crecen en las quebradas y laderas. En cuanto a los animales, son muy comunes los roedores como la chinchilla o la rata chinchilla. Los habitantes más simpáticos del lugar son los camélidos guanaco, vicuña y llama. También podemos encontrar carnívoros como el puma y en las lagunas temporarias habitan los flamencos. Entre las aves el cóndor, y la gaviota andina. Y los principales reptiles son el lagarto overo, la tortuga terrestre, lagartijas y serpientes. La más importante de las quebradas es la de Humahuaca, de 155 km de longitud. Es recorrida por el río Grande, cuyos afluentes vuelcan sus aguas al río principal enmarcados por pequeñas quebradas laterales. Esta quebrada ha funcionado como una importante vía de interacción, vinculando diversas culturas y constituyéndose en el camino de los Incas antes de la llegada de los españoles.",
    "name":"Quebrada",
    "code": "quebrada",
    "pic":"18e71211546e3a95c53d5c31d2259d7b.png",
    "pics":[
      "6231ea9a040c0b998c044c508361fb9c.jpg"
    ],
    "type":"subregion",
    "offsetX":158,
    "offsetY":120
},
// NEA
{
    "id": "",
    "audio":[],
    "description":"Son consideradas una de las siete maravillas naturales del Mundo y Patrimonio de la Humanidad. Están compuestas por 275 saltos enmarcados dentro de una selva de vegetación abundante y frondosa con una gran variedad de especies animales. El clima es cálido y las precipitaciones abundantes. Algunos de los animales que las habitan son el yacaré, el coatí, serpientes y mariposas.",
    "name":"Cataratas del Iguazú",
    "code": "cataratas-iguazu",
    "pic":"Cataratas.jpg",
    "pics":[
        "Cataratas.jpg",
      "Cataratas1.jpg"
    ],
    "type":"subregion",
    "offsetX":338,
    "offsetY":140
},
{
    "id": "",
    "audio":[],
    "description":"Se extiende por toda la provincia de Misiones y el noroeste de Corrientes. Se caracteriza por su suelo colorado rico en hierro y la frondosa vegetación de la selva subtropical, rica en especies animales y vegetales. Su clima es cálido y húmedo.",
    "name":"Meseta Misionera",
    "code": "meseta-misionera",
    "pic":"Meseta_misionera.jpg",
    "pics":[
        "Meseta_misionera.jpg",
      "Meseta_misionera_1.jpg"
    ],
    "type":"subregion",
    "offsetX":270,
    "offsetY":175
},
{
    "id": "",
    "audio":[],
    "description":"Iberá significa “agua brillante” en guaraní. Los esteros están formados por lagunas y zonas pantanosas que se encuentran en el centro de la provincia de Corrientes y cuentan con una gran diversidad de especies vegetales y fauna autóctona, tanto de animales acuáticos como terrestres y aves. En la zona hay abundantes lluvias y altas temperaturas.",
    "name":"Esteros del Iberá",
    "code": "esteros-ibera",
    "pic":"Esteros.jpg",
    "pics":[
        "Esteros.jpg",
      "Esteros_1.jpg"
    ],
    "type":"subregion",
    "offsetY":247,
    "offsetX":185
},
{
    "id": "",
    "audio":[],
    "description":"Es una zona ubicada entre el Chaco Húmedo y la Selva de las Yungas en el NOA. Se caracteriza por su clima cálido y seco. El relieve es de llanura y la vegetación se adapta a la sequía del lugar, encontramos: bosques secos como formación principal, y también sabanas y pastizales.",
    "name":"Chaco Seco",
    "code": "chaco-seco",
    "pic":"Chaco_seco.jpg",
    "pics":[
        "Chaco_seco.jpg",
      "Chaco_seco_1.jpg"
    ],
    "type":"subregion",
    "offsetX":50,
    "offsetY":110
},
{
    "id": "",
    "audio":[],
    "description":"Ocupa el oeste de Chaco y Formosa, Noroeste de Corrientes y Norte de Santa Fé. El clima es cálido y húmedo, pero con precipitaciones menores a las de la selva misionera. Sus principales características son su relieve deprimido y los bosques de quebracho colorado y blanco.",
    "name":"Chaco Húmedo",
    "code": "chaco-humedo",
    "pic":"Chaco_húmedo.jpg",
    "pics":[
        "Chaco_húmedo.jpg",
      "Chaco_húmedo_1.jpg"
    ],
    "type":"subregion",
    "offsetX":238,
    "offsetY":140
},
// Cuyo
{
    "id": "",
    "audio":[],
    "description":"Mide 6959 metros y es el pico más alto de América. Se encuentra en la provincia de Mendoza y es la montaña más alta de la Cordillera, donde el clima es frío, seco y ventoso durante todo el año. En cuanto a su vegetación predominan los pastizales abiertos.",
    "name":"Aconcagua",
    "code": "aconcagua",
    "pic":"",
    "pics":[
        "aconcagua.jpg"
    ],
    "type":"subregion",
    "offsetX":150,
    "offsetY":170
},
{
    "id": "",
    "audio":[],
    "description":"En quechua significa: Sitio donde se posa la luna. Está ubicado al noroeste de San Juan y su clima es desértico. Allí hay grandes yacimientos ricos en fósiles. La vegetación es poco abundante y su fauna es típica de monte: guanacos, zorros grises, ñandú, aves rapaces.",
    "name":"Valle de la luna",
    "code": "valle-luna",
    "pic":"",
    "pics":[
        "Valle_de_la_luna.jpg",
      "Valle_de_la_luna_2.jpg"
    ],
    "type":"subregion",
    "offsetX":130,
    "offsetY":100
},
{
    "id": "",
    "audio":[],
    "description":"Es una formación rocosa ubicada al noroeste de Mendoza. Creada por la erosión del río Las Cuevas, forma un puente natural de 48 metros de largo, suspendido a 27 metros sobre el río. Debe su nombre a las visitas frecuentes que hacían los Incas al lugar.",
    "name":"Puente del Inca",
    "code": "puente-inca",
    "pic":"",
    "pics":[
        "Puente_del_inca.jpg",
      "Puente_del_inca_1.jpg"
    ],
    "type":"subregion",
    "offsetX":115,
    "offsetY":225
},
{
    "id": "",
    "audio":[],
    "description":"Son grandes áreas basadas en el buen aprovechamiento de los ríos y las aguas subterráneas. Allí se cultiva la vid y se elaboran los vinos que hacen de la región de Cuyo la principal productora de vinos de Sudamérica. Además, se cultivan olivares y frutales.",
    "name":"Oasis de cultivos",
    "code": "oasis-cultivos",
    "pic":"",
    "pics":[
        "Oasis_de_cultivo.jpg",
      "Oasis_de_cultivo_1.jpg"
    ],
    "type":"subregion",
    "offsetX":280,
    "offsetY":110
},
{
    "id": "",
    "audio":[],
    "description":"Se encuentran mayormente en la provincia de La Rioja, donde predominan los relieves montañosos y de quebradas. La tierra es colorada por la gran cantidad de hierro que posee. La vegetación es escasa porque el clima es semiárido en casi todo el territorio.",
    "name":"Montañas y tierra colorada",
    "code": "montanas",
    "pic":"",
    "pics":[
        "Montañas_y_tierra_colorada.jpg",
        "Montañas_y_tierra_colorada_1.jpg"
    ],
    "type":"subregion",
    "offsetX":240,
    "offsetY":50
},
// Pampa
{
    "id": "",
    "audio":[],
    "description":"La Ciudad Autónoma de Buenos Aires es la capital de nuestro país y su ciudad más poblada. Se encuentra en la orilla del Río de la Plata. Uno de sus íconos más conocidos es el Obelisco, un monumento histórico construido en 1936 para recordar los 400 años de la primera fundación de la ciudad.",
    "name":"Ciudad y puerto",
    "code": "ciudad",
    "pic":"",
    "pics":[
        "Ciudad.jpg",
        "Ciudad_1.jpg"
    ],
    "type":"subregion",
    "offsetX":310,
    "offsetY":160
},
{
    "id": "",
    "audio":[],
    "description":"Abarca el litoral del mar Argentino y se extiende más allá de la región pampeana, alcanzando las provincias de Río Negro, Chubut y Santa Cruz. Se destaca por sus amplias playas, médanos y bosques perennes que se extienden por kilómetros. La ciudad de Mar del Plata, en la provincia de Buenos Aires, es el destino más visitado cada verano.",
    "name":"Costa atlántica",
    "code": "costa-atlantica",
    "pic":"",
    "pics":[
        "Costa_atlántica.jpg",
        "Costa_atlántica_1.jpg"
    ],
    "type":"subregion",
    "offsetX":290,
    "offsetY":295
},
{
    "id": "",
    "audio":[],
    "description":"Son dos sistemas montañosos ubicados al sudoeste de la provincia de Buenos Aires. Tandilia es un conjunto de sierras de 300km de longitud, donde las Sierras de Tandil son las más importantes. El sistema de Ventania tiene 188km de longitud. Allí encontramos al cerro Tres Picos, el más alto de la provincia con 1239 msnm.",
    "name":"Sierras de Tandil",
    "code": "sierras-tandil",
    "pic":"",
    "pics":[
        "Sierras_de_tandil.jpg",
        "Sierras_de_tandil_1.jpg"
    ],
    "type":"subregion",
    "offsetX":220,
    "offsetY":260
},
{
    "id": "",
    "audio":[],
    "description":"Aquí encontramos la zona agrícola y ganadera más grande, por sus características de clima y suelo. En ella crecen especialmente cereales y oleaginosas. Se cultiva trigo, maíz, lino, avena, cebada, centeno, girasol y soja. Además presenta las mejores pasturas para desarrollar la actividad ganadera, tanto de vacas como de ovejas.",
    "name":"Campos cultivados",
    "code": "campos-cultivados",
    "pic":"",
    "pics":[
        "Campos_cultivados.jpg",
        "Campos_cultivados_1.jpg"
    ],
    "type":"subregion",
    "offsetX":250,
    "offsetY":170
}

];
  Subregions.byName = function(name) {
    return _.findWhere(this, { name: name });
  };

  Subregions.byCode = function(code) {
    return _.findWhere(this, { code: code });
  };
  return Subregions;
}]);
