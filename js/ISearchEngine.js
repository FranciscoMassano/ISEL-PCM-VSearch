'use strict';

class ISearchEngine {
    constructor(dbase) {
        //Pool to include all the objects (mainly pictures) drawn in canvas 
        this.allpictures = new Pool(3000);
        //Array of color to be used in image processing algorithms
        this.colors = ["red", "orange", "yellow", "green", "Blue-green", "blue", "purple", "pink", "white", "grey", "black", "brown"];
        // Red component of each color
        this.redColor = [204, 251, 255, 0, 3, 0, 118, 255, 255, 153, 0, 136];
        // Green component of each color
        this.greenColor = [0, 148, 255, 204, 192, 0, 44, 152, 255, 153, 0, 84];
        // Blue component of each color
        this.blueColor = [0, 11, 0, 0, 198, 255, 167, 191, 255, 153, 0, 24];
        //List of categories available in the image database
        this.categories = ["beach", "birthday", "face", "indoor", "manmade/artificial", "manmade/manmade", "manmade/urban", "marriage", "nature", "no_people", "outdoor", "party", "people", "snow"];
        //Name of the XML file with the information related to the images 
        this.XML_file = dbase;
        // Instance of the XML_Database class to manage the information in the XML file 
        this.XML_db = new XML_Database();
        // Instance of the LocalStorageXML class to manage the information in the LocalStorage 
        this.LS_db = new LocalStorageXML();
        //Number of images per category for image processing
        this.num_Images = 100;
        //Number of images to show in canvas as a search result
        this.numshownpic = 35;
        //Width of image in canvas
        this.imgWidth = 95;
        //Height of image in canvas
        this.imgHeight = 70;
    }

    //Method to initialize the canvas. First stage it is used to process all the images
    init(cnv) {
        //this.databaseProcessing(cnv);


    }

    // method to build the database which is composed by all the pictures organized by the XML_Database file
    // At this initial stage, in order to evaluate the image algorithms, the method only compute one image.
    // However, after the initial stage the method must compute all the images in the XML file
    databaseProcessing(cnv) {
        //Images processing classes
        let h12color = new ColorHistogram(this.redColor, this.greenColor, this.blueColor);
        let colmoments = new ColorMoments();
        let doc = this.XML_db.loadXMLfile(this.XML_file);

        //let img = new Picture(0, 0, this.imgWidth, this.imgHeight, "Images/daniel1.jpg", "test");
        //Creating an event that will be used to understand when image is already processed
        // let eventname = "processed_picture_" + img.impath;
        // let eventP = new Event(eventname);
        // let self = this;
        // document.addEventListener(eventname, function() {
        //     self.imageProcessed(img, eventname);
        // }, false);
        //
        // img.computation(cnv, h12color, colmoments, eventP);

        //aceder a todas as categorias
        for(let i = 0; i < this.categories.length; i++) {
            //array de paths para as imagens
            let imagePath = this.XML_db.SearchXML(this.categories[i], doc, this.num_Images);
            //aceder a imagem de cada categotia
            for(let j = 0; j < imagePath.length; j++) {
                //cria um novo objecto Picture
                let img = new Picture(0, 0, this.imgWidth, this.imgHeight, imagePath[j] ,this.categories[i]);
                let eventname = "processed_picture_" + img.impath;
                let eventP = new Event(eventname);
                let self = this;
                document.addEventListener(eventname, function () {
                    self.imageProcessed(img, eventname);
                }, false);

                img.computation(cnv, h12color, colmoments, eventP);

            }
        }
    }

    //When the event "processed_picture_" is enabled this method is called to check if all the images are
    //already processed. When all the images are processed, a database organized in XML is saved in the localStorage
    //to answer the queries related to Color and Image Example
    imageProcessed(img, eventname) {
        this.allpictures.insert(img);
        console.log("image processed " + this.allpictures.stuff.length + eventname);
        if (this.allpictures.stuff.length === (this.num_Images * this.categories.length)) {
            this.createXMLColordatabaseLS();
            this.createXMLIExampleDatabaseLS();
        }
    }

    //Method to create the XML database in the localStorage for color queries
    createXMLColorDatabaseLS() {

        // this method should be completed by the students



    }

    //Method to create the XML database in the localStorage for Image Example queries
    createXMLIExampleDatabaseLS() {
        let list_images = new Pool(this.allpictures.stuff.length);
        //this.zscoreNormalization();

        // this method should be completed by the students

        let xmlString = "<images>";
         for (let i = 0; i <list_images; i++) {
             list_images[i] = this.allpictures.stuff[i];
             console.log(list_images[i].impath);
         }

         for (let i = 0; i < list_images; i++) {
             xmlString = xmlString + "<img class='Manhattan" + "'>" + "<path>" + list_images[i].impath + "</path>" + "</img>";
         }
        xmlString = xmlString + "</images>";
        this.LS_db.saveLS_XML("path", xmlString);


    }

    //A good normalization of the data is very important to look for similar images. This method applies the
    // zscore normalization to the data
    zscoreNormalization() {
        let overall_mean = [];
        let overall_std = [];

        // Inicialization
        for (let i = 0; i < this.allpictures.stuff[0].moments.length; i++) {
            overall_mean.push(0);
            overall_std.push(0);
        }

        // Mean computation I
        for (let i = 0; i < this.allpictures.stuff.length; i++) {
            for (let j = 0; j < this.allpictures.stuff[0].color_moments.length; j++) {
                overall_mean[j] += this.allpictures.stuff[i].color_moments[j];
            }
        }

        // Mean computation II
        for (let i = 0; i < this.allpictures.stuff[0].color_moments.length; i++) {
            overall_mean[i] /= this.allpictures.stuff.length;
        }

        // STD computation I
        for (let i = 0; i < this.allpictures.stuff.length; i++) {
            for (let j = 0; j < this.allpictures.stuff[0].color_moments.length; j++) {
                overall_std[j] += Math.pow((this.allpictures.stuff[i].color_moments[j] - overall_mean[j]), 2);
            }
        }

        // STD computation II
        for (let i = 0; i < this.allpictures.stuff[0].color_moments.length; i++) {
            overall_std[i] = Math.sqrt(overall_std[i] / this.allpictures.stuff.length);
        }

        // zscore normalization
        for (let i = 0; i < this.allpictures.stuff.length; i++) {
            for (let j = 0; j < this.allpictures.stuff[0].color_moments.length; j++) {
                this.allpictures.stuff[i].color_moments[j] = (this.allpictures.stuff[i].color_moments[j] - overall_mean[j]) / overall_std[j];
            }
        }
    }

    rgbToHex (rgb) {
        let hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    HEX2RGB (hex) {
        "use strict";
        if (hex.charAt(0) === '#') {
            hex = hex.substr(1);
        }
        if ((hex.length < 2) || (hex.length > 6)) {
            return false;
        }
        let values = hex.split(''),
            r,
            g,
            b;

        if (hex.length === 2) {
            r = parseInt(values[0].toString() + values[1].toString(), 16);
            g = r;
            b = r;
        } else if (hex.length === 3) {
            r = parseInt(values[0].toString() + values[0].toString(), 16);
            g = parseInt(values[1].toString() + values[1].toString(), 16);
            b = parseInt(values[2].toString() + values[2].toString(), 16);
        } else if (hex.length === 6) {
            r = parseInt(values[0].toString() + values[1].toString(), 16);
            g = parseInt(values[2].toString() + values[3].toString(), 16);
            b = parseInt(values[4].toString() + values[5].toString(), 16);
        } else {
            return false;
        }
        return [r, g, b];
    }

    //Method to search images based on a selected color
    searchColor(category, color) {
        console.log("SearchEngine - SearchColor Start");
        let xmlDoc = this.XML_db.loadXMLfile(this.XML_file); //load xml doc
        let domColor = "dominantcolor";
        let xmlDocPath = this.XML_db.SearchXML(category, xmlDoc, this.numshownpic);
        console.log(xmlDocPath);


        //inserir as imagens na pool, de acordo com o array gerado acima
        for(let i = 0; i < this.numshownpic; i++){
            if (color === xmlDocPath) {
                let img = new Picture(0, 0, 100, 100, xmlDocPath[i], category);
                this.allpictures.insert(img);
            }
        }



        // let localStorageXml = this.LS_db.readLS_XML(category);
        // console.log(localStorageXml);
        // let imagesArray = localStorageXml.getElementsByClassName(color).childNodes;
        // console.log(imagesArray);

        //para cada imagem ser inserida na pool
        // for(let i = 0; i < imagesArray.length; i++){
        //     let path = imagesArray.item(i).textContent; //path
        //     let img = new Picture(0, 0, 100, 100, path, category); // cria uma picture com o proprio path e adiciona ao allpictures
        //     this.allpictures.insert(img);
        // }
        console.log("SearchEngine - SearchColor End");

    }

    //Method to search images based on keywords
    searchKeywords(category) {

        console.log("SearchEngine - SearchKeywords Start");
        // this method should be completed by the students
        let xmlDoc = this.XML_db.loadXMLfile(this.XML_file);
        let xmlDocPath = this.XML_db.SearchXML(category, xmlDoc, this.numshownpic);

       // console.log(xmlDoc);
       //  console.log(xmlDocPath);

        //inserir as imagens na pool, de acordo com o array gerado acima
        for(let i = 0; i < this.numshownpic; i++){
            let img = new Picture(0, 0, 100, 100, xmlDocPath[i], category);
            this.allpictures.insert(img);
        }
        console.log("SearchEngine - SearchKeywords End");
    }

    //Method to search images based on Image similarities
    searchISimilarity(IExample, dist) {

        // this method should be completed by the students

    }

    //Method to compute the Manhattan difference between 2 images which is one way of measure the similarity
    //between images.
    calcManhattanDist(img1, img2) {
        let manhattan = 0;

        for (let i = 0; i < img1.color_moments.length; i++) {
            manhattan += Math.abs(img1.color_moments[i] - img2.color_moments[i]);
        }
        manhattan /= img1.color_moments.length;
        return manhattan;
    }

    //Method to sort images according to the Manhattan distance measure
    sortbyManhattanDist(idxdist, list) {

        // this method should be completed by the students
        list.sort(function (a, b) {
            return this.calcManhattanDist(b[idxdist], a[idxdist]);
        })
    }

    //Method to sort images according to the number of pixels of a selected color
    sortbyColor(idxColor, list) {
        list.sort(function(a, b) {
            return b.hist[idxColor] - a.hist[idxColor];
        });
    }

    //Method to visualize images in canvas organized in columns and rows
    gridView(canvas) {
        console.log("gridview start");

        let nCols =5;
        let nLines = this.numshownpic / nCols;
        let w = 190;
        let h = 150;
        let index = 0;

        //linhas
        for (let i = 0; i < nLines; i++) {
            //colunas
            for (let j = 0; j < nCols ; j++) {
                let currentImage = this.allpictures.stuff[index];
                currentImage.setSize(w,h);
                currentImage.setPosition( 30 + j*(w + 30) , 30 + i*(h + 30));
                currentImage.draw(canvas);
                index++;
            }
        }
        //apos fazer o display, esvazia a pool
        this.allpictures.empty_Pool();

    }
    getCategories() {
        return this.categories;
    }

}


class Pool {
    constructor(maxSize) {
        this.size = maxSize;
        this.stuff = [];

    }

    insert(obj) {
        if (this.stuff.length < this.size) {
            this.stuff.push(obj);
        } else {
            alert("The application is full: there isn't more memory space to include objects");
        }
    }

    remove() {
        if (this.stuff.length !== 0) {
            this.stuff.pop();
        } else {
            alert("There aren't objects in the application to delete");
        }
    }

    empty_Pool() {
        while (this.stuff.length > 0) {
            this.remove();
        }
    }
}
