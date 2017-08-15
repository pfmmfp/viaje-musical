/*global angular*/
'use strict';

angular.module('core').factory('Instruments', ['_',
    function(_) {


        var Instruments = {};

        Instruments.data = [{
            "id": "5556072337cce2ac20d3006b",
            "audio": {
                "default": "b6ca30d1f38993928f7c69fc4d760877.mp3"
            },
            "description": "Es un instrumento de cuerda punteada y rasgueada que tiene cinco órdenes o juegos de cuerdas dobles. Su caja puede estar hecha de madera o construida usando un caparazón de quirquincho, mulita o armadillos. Nace en la región altiplánica de los Andes durante la época colonial, a partir de la modificación de otros instrumentos de cuerda de origen europeo.",
            "family": "",
            "name": "Charango",
            "code": "charango",
            "pic": "54f3d33e8773270d8eec03b197a4698a.png",
            "pics": [],
            "type": "instrument"
        }, {
            "id": "5556153c49d61f2f291d62de",
            "audio": {
                "default": "86951cbcd50cdc1a98f024f9c5d77e14.mp3"
            },
            "pics": [],
            "pic": "4a3641f5a8c6573ddf21c1ff50fd576f.png",
            "family": "",
            "description": "Es un instrumento de viento de bisel, de origen preincaico, usado de modo tradicional por los habitantes de los Andes centrales. La quena es tradicionalmente de caña o madera y tiene un total de siete agujeros, seis al frente y uno atrás para el pulgar, que dan dos octavas diatónicas. En la actualidad es uno de los instrumentos típicos de los conjuntos folclóricos de música andina.",
            "name": "Quena",
            "code": "quena",
            "type": "instrument"
        }, {
            "id": "5556158249d61f2f291d62df",
            "audio": {
                "default": "a5bb8eb14d82c68bb6245e6fb4a33253.mp3"
            },
            "pics": [],
            "pic": "0276ca460da8d44a2c25f9f2bebe4ccb.png",
            "family": "",
            "description": "Son un idiófono de entrechoque que consiste en una pulsera de tela o tejido en la cual se encuentran sujetas un manojo de pezuñas de cabra. Puede usarse en los tobillos para marcar el pulso con los pies al bailar, en las muñecas de los brazos o sosteniéndolo con las manos y haciéndolo vibrar. Es un instrumento musical ritual muy antiguo de la región andina de América, y se lo puede encontrar principalmente en el norte argentino, Bolivia, Perú y Ecuador.",
            "name": "Chajchas",
            "code": "chajchas",
            "type": "instrument"
        }, {
            "id": "555615b449d61f2f291d62e0",
            "audio": {
                "default": "7abb65aacc383dd234fcf11b39bc976b.mp3"
            },
            "pics": [],
            "pic": "fead52599ad8ff22548b051a9f3ff085.png",
            "family": "",
            "description": "Es un instrumento de percusión que pertenece a la familia de los membranófonos. Consta de dos parches o membranas de cuero con pelo sujetas a un cilindro de madera por tiras de madera. Se utiliza, preferentemente, un tronco de árbol ahuecado de ceibo, tala o quebracho blanco y cuero de cabra, de oveja, guanaco, vizcacha u otro animal.",
            "name": "Bombo legüero",
            "code": "bomboleguero",
            "type": "instrument"
        }, {
            "id": "5931d009677a485915b38ddf",
            "audio": {
                "default": "5eb5295549a4e6cba7608210beecc34f.mp3",
                "zamba": "guitarra-zamba.mp3",
                "milonga": "guitarra-milonga.mp3",
                "chamame": "guitarra-chamame.mp3"
            },
            "description": "Es un instrumento de cuerda, compuesto de una caja de madera, un mástil sobre el que va adosado el diapasón o trastero y, generalmente, seis cuerdas. Sobre el diapasón van incrustados los trastes, que permiten generar las diferentes notas. El músico que toca la guitarra recibe el nombre de guitarrista.",
            "family": "",
            "name": "Guitarra",
            "code": "guitarra",
            "pic": "eaab9acc7c30b569b64c9ca3853ae34d.png",
            "pics": [],
            "type": "instrument"
        }, {
            "id": "5931d0c4677a485915b38de0",
            "audio": {
                "default": "115fd97f777626099c01cef3f90d1c76.mp3",
                "milonga": "bandoneon-milonga.mp3",
                "chamame": "bandoneon-chamame.mp3"
            },
            "description": "Es un instrumento de viento, de lengüetas libres, a fuelle. Es un instrumento presente en distintas músicas de nuestro país, como el tango, la milonga y el chamamé. Es pariente de un instrumento alemán: la concertina y se dice que su uso fue inicialmente como órgano portátil para ejecutar música religiosa. El músico que toca el bandoneón recibe el nombre de bandoneonista.",
            "family": "",
            "name": "Bandoneón",
            "code": "bandoneon",
            "pic": "0aa4332e45a70e7322cdccd0b962b57f.png",
            "pics": [],
            "type": "instrument"
        }, {
            "id": "5931d134677a485915b38de1",
            "audio": {
                "default": "5ec1730fea452c530d1ced6209d19b98.mp3",
                "chamame": "contrabajo-chamame.mp3"
            },
            "description": "Es un instrumento de cuerda frotada de tesitura grave. Suele tener cuatro cuerdas que se afinan por cuartas y las notas que suenan son mi-la- re-sol. El músico que toca el contrabajo recibe el nombre de contrabajista.",
            "family": "",
            "name": "Contrabajo",
            "code": "contrabajo",
            "pic": "c603c8401fb1331d9eafb09a8bfe8d23.png",
            "pics": [],
            "type": "instrument"
        }, {
            "id": "5934836fc47ad2f030ca0d51",
            "audio": {
                "default": "bc315a2e93f6fe64ae5c5d68da79e737.mp3",
                "milonga": "piano-milonga.mp3",
                "zamba": "piano-zamba.mp3"
            },
            "created": {
                "$date": 1496613743586
            },
            "description": "Es un instrumento armónico de teclado y de cuerdas percutidas. Su nombre, que en italiano significa «suave», es apócope del término «pianoforte», que hacía referencia a sus matices suave y fuerte, y que fue su nombre original. El músico que toca el piano se llama pianista.",
            "family": "",
            "name": "Piano",
            "code": "piano",
            "pic": "c03eb47df1e8eedd3bbc9d8bd0c9b068.png",
            "pics": [],
            "type": "instrument"
        }, {
            "id": "5934889cc47ad2f030ca0d52",
            "audio": {
                "default": "316d37d30723d042b1195d63a6888fac.mp3"
            },
            "pics": [],
            "pic": "fe9b6be22a32d61249424d8f95c59f06.png",
            "family": "",
            "description": "La voz es un instrumento de viento, componente de la música que se crea mediante las cuerdas vocales de una persona. La voz humana se puede utilizar de distintas maneras en la música, por ejemplo el canto. Un vocalista es un músico que interpreta mediante la voz, y un cantante es un vocalista que se expresa mediante el canto.",
            "name": "Voz",
            "code": "voz1",
            "type": "instrument"
        }, {
            "id": "593488c6c47ad2f030ca0d53",
            "audio": {
                "default": "bee592b6e160f99614c9260d9f91a251.mp3"
            },
            "pics": [],
            "pic": "9113187e202af4fb211ac69cc15708a0.png",
            "family": "",
            "description": "La voz es un instrumento de viento, componente de la música que se crea mediante las cuerdas vocales de una persona. La voz humana se puede utilizar de distintas maneras en la música, por ejemplo el canto. Un vocalista es un músico que interpreta mediante la voz, y un cantante es un vocalista que se expresa mediante el canto.",
            "name": "Voz Segunda",
            "code": "voz2",
            "type": "instrument"
        }, {
            "id": "59348909c47ad2f030ca0d54",
            "audio": {
                "default": "411ce8949c6ef574949303aee43e3b1f.mp3"
            },
            "pics": [],
            "pic": "886e41d08a6c152a9c20d734ae2e63ee.png",
            "family": "",
            "description": "Es un instrumento de percusión membranófono, de timbre muy grave aunque de tono indeterminado. Debido a su sonido grave, se usa habitualmente para marcar y mantener el pulso en diversos estilos de música.",
            "name": "Bombo",
            "code": "bombo",
            "type": "instrument"
        }];

        Instruments.findByIds = function(ids) {
            ids = ids || [];
            return _.filter(this.data, function(instrument) {
                return ids.indexOf(instrument.id) >= 0;
            });
        };

        Instruments.findByCodes = function(codes) {
            codes = codes || [];
            return _.chain(this.data).filter(function(instrument) {
                return _.find(codes, function(code) {
                    return !_.isUndefined(code[instrument.code]);
                }) !== undefined;
            })
            .each(function(instrument) {
                var variant = _.find(codes, function(code) {
                    return !_.isUndefined(code[instrument.code]);
                });
                instrument.audioFile = instrument.audio[variant[instrument.code]];
            })
            .value();
        };

        Instruments.byId = function(id) {
            return _.find(this.data, function(instrument) {
                return instrument.id === id;
            });
        };

        Instruments.byCode = function(code) {
            return _.find(this.data, function(instrument) {
                return instrument.code === code;
            });
        };

        return Instruments;
    }
]);
