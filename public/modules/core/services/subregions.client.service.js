/*global angular*/
'use strict';

angular.module('core').factory('Subregions', ['_',
function(_) {

  var Subregions = [{
    "id": "55561764eb0810683cd40c4b",
    "audio":[],
    "description":"Fue declarada por la UNESCO Patrimonio de la Humanidad. Es un largo y estrecho valle ubicado en la provincia de Jujuy y recorrido por el río Grande. Pertenece a un conjunto de paisajes similares ubicados en la Cordillera Oriental",
    "name":"Quebrada",
    "code": "quebrada",
    "pic":"18e71211546e3a95c53d5c31d2259d7b.png",
    "pics":[
      "Quebrada_de_Humahuaca.jpg"
    ],
    "type":"subregion",
    "offsetX":600,
    "offsetY":240
},
{
    "id": "",
    "audio":[],
    "description":"La encontramos en las laderas orientales de los cordones montañosos. La temperatura es cálida y las precipitaciones muy abundantes, esto da origen a una selva con una gran variedad de especies vegetales y animales.",
    "name":"Selva de las yungas",
    "code": "selva",
    "pic":"",
    "pics":[
        "Selva_de_las_yungas.jpg",
        "Selva_de_las_yungas1.jpg"
    ],
    "type":"subregion",
    "offsetX":650,
    "offsetY":350
},
{
    "id": "",
    "audio":[],
    "description":"Se extiende desde la provincia de Jujuy hasta el norte de San Juan en el sector occidental del país. La altura condiciona la temperatura, el clima es frío y seco. La vegetación es también escasa y se adapta a las condiciones climáticas.",
    "name":"Puna",
    "code": "puna",
    "pic":"",
    "pics":[
        "La_puna.jpg",
        "La_puna1.jpg"
    ],
    "type":"subregion",
    "offsetX":515,
    "offsetY":200
},
{
    "id": "",
    "audio":[],
    "description":"Se ubica en la localidad de Purmamarca en Jujuy. Su principal característica es la superposición de capas de sedimentos de distinto origen que dan lugar a los colores que caracterizan una de las mayores atracciones naturales del Noroeste Argentino.",
    "name":"Cerro de los siete colores",
    "code": "cerro-7-colores",
    "pic":"",
    "pics":[
        "Cerro_de_los_7_colores.jpg",
        "Cerro_de_los_7_colores1.jpg"
    ],
    "type":"subregion",
    "offsetX":480,
    "offsetY":330
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
    "offsetX":1000,
    "offsetY":270
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
    "offsetX":900,
    "offsetY":390
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
    "offsetY":400,
    "offsetX":750
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
    "offsetX":560,
    "offsetY":230
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
    "offsetX":750,
    "offsetY":230
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
    "offsetX":600,
    "offsetY":300
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
    "offsetX":630,
    "offsetY":200
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
    "offsetX":615,
    "offsetY":345
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
    "offsetX":800,
    "offsetY":200
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
    "offsetX":750,
    "offsetY":150
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
    "offsetX":1165,
    "offsetY":340
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
    "offsetX":1170,
    "offsetY":430
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
    "offsetX":1050,
    "offsetY":400
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
    "offsetX":1000,
    "offsetY":350
},
// Sierras pampeanas
{
    "id": "",
    "audio":[],
    "description":"Los animales y vegetación cambian según la zona. En las zonas más áridas, viven zorros, alpacas, vicuñas y guanacos. Por la escasez de agua, la vegetación es pobre. En las zonas más húmedas se encuentran llamas, liebres, pumas y gatos monteses, y abundan los arbustos como el chañar y el algarrobo.",
    "name":"Su flora y fauna",
    "code": "flora-fauna",
    "pic":"",
    "pics":[
        "Flora_y_fauna.jpg",
        "Flora_y_fauna_1.jpg"
    ],
    "type":"subregion",
    "offsetX":700,
    "offsetY":340
},
{
    "id": "",
    "audio":[],
    "description":"Se distinguen por sus aguas claras, de calidad, libres de contaminantes y de lecho arenoso, que descienden desde las montañas. El área de Traslasierra en la provincia de Córdoba se encuentra atravesada por numerosos ríos y arroyos.",
    "name":"Arroyos de montaña",
    "code": "arroyos",
    "pic":"",
    "pics":[
        "Arroyos_de_montaña.jpg",
        "Arroyos_de_montaña_1.jpg"
    ],
    "type":"subregion",
    "offsetX":760,
    "offsetY":230
},
{
    "id": "",
    "audio":[],
    "description":"Son formaciones montañosas de mediana altura, siendo el pico más alto el Cerro Champaquí con 2884 msnm. Se extienden 490km de norte a sur y 150km de este a oeste. En ciertas zonas los suelos erosionados por las lluvias y deshielos originaron sistemas de cuevas y grutas.",
    "name":"Sierras de Córdoba",
    "code": "sierras",
    "pic":"",
    "pics":[
        "Sierras_de_córdoba.jpg",
        "Sierras_de_córdoba_1.jpg"
    ],
    "type":"subregion",
    "offsetX":600,
    "offsetY":290
},
// Patagonia
{
    "id": "",
    "audio":[],
    "description":"Es una gran masa de hielo que avanza continuamente, provocando la acumulación, ruptura y desprendimiento de gigantescos bloques de hielo. Se ubica al sudoeste de la provincia de Santa Cruz, rodeado de bosques y montañas, integrando el Parque Nacional Los Glaciares. El glaciar mide 5km de frente, pasa 74 ms sobre el lago Argentino y se sumerge 170m en él.",
    "code":"glaciar-perito-moreno",
    "name": "Glaciar Perito Moreno",
    "pic":"",
    "pics":[
        "Glaciar_Perito_Moreno.jpg",
        "Glaciar_Perito_Moreno_1.jpg"
    ],
    "type":"subregion",
    "offsetX":580,
    "offsetY":290
},
{
    "id": "",
    "audio":[],
    "description":"Se extiende desde Neuquén hasta el sur de Tierra del Fuego. Es una región rica en cerros, montañas, volcanes, cascadas, bosques, ríos, concentrando la mayor cuenca lacustre de Argentina. Sus mayores alturas son el volcán Lanín y el cerro Tronador, ninguno sobrepasando los 4000m.",
    "name":"Cordillera patagónica",
    "code": "cordillera",
    "pic":"",
    "pics":[
        "Cordillera_patagónica.jpg",
        "Cordillera_patagónica_1.jpg"
    ],
    "type":"subregion",
    "offsetX":600,
    "offsetY":150
},
{
    "id": "",
    "audio":[],
    "description":"Se encuentra en la provincia de Chubut, sobre el mar Argentino. Todos los años recibe la mayor población de ballenas francas australes. Además, se avistan pingüinos, lobos marinos y una gran variedad de aves.",
    "name":"Península de Valdés",
    "code": "peninsula-valdes",
    "pic":"",
    "pics":[
        "Península_de_valdés.jpg",
        "Península_de_valdés_1.jpg"
    ],
    "type":"subregion",
    "offsetY":170,
    "offsetX":910
},
{
    "id": "",
    "audio":[],
    "description":"La estepa se extiende por 730.000 km² incluyendo llanuras, montañas, valles, cañadones y mesetas, que son planicies con forma escalonada que descienden desde los Andes hasta la plataforma submarina. El clima es frío, árido y muy ventoso. Ocupa distintas áreas de las provincias de Neuquén, Río Negro, Chubut, Santa Cruz y Tierra del Fuego.",
    "name":"Meseta patagónica",
    "code": "meseta-patagonica",
    "pic":"",
    "pics":[
        "Meseta_patagónica.jpg",
        "Meseta_patagónica_1.jpg"
    ],
    "type":"subregion",
    "offsetX":680,
    "offsetY":350
},
{
    "id": "",
    "audio":[],
    "description":"Es el principal paso natural entre los océanos Pacífico y Atlántico, atravesando desde el norte de Tierra del Fuego hasta el extremo sur de Chile. Su longitud aproximada es de 565km. Es una vía difícil de navegar por los vientos y corrientes impredecibles y la estrechez del paso.",
    "name":"Estrecho de Magallanes",
    "code": "estrecho-magallanes",
    "pic":"",
    "pics":[
        "Estrecho_de_magallanes.jpg",
        "Estrecho_de_magallanes_1.jpg"
    ],
    "type":"subregion",
    "offsetX":630,
    "offsetY":450
},
{
    "id": "",
    "audio":[],
    "description":"Conocida como la Capital Nacional del Petróleo por ser el primer lugar donde se descubre petróleo en el territorio nacional en 1907. Se encuentra en la meseta patagónica, en el corazón de la zona hidrocarburífera del golfo San Jorge. Posee una de las cuencas petrolíferas más importantes de Sudamérica.",
    "name":"Comodoro Rivadavia",
    "code": "comodoro-rivadavia",
    "pic":"",
    "pics":[
        "Comodoro_Rivadavia.jpg",
        "Comodoro_Rivadavia_1.jpg"
    ],
    "type":"subregion",
    "offsetY":280,
    "offsetX":730
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
