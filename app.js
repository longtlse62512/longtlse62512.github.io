
let $overlay = $('<div id="overlay"></div>');
$('body').append($overlay);
$('.flower-ring').mouseover(function(){
    $overlay.css({
        display: 'block'
    });
});
$('.flower-ring').mouseleave(function(){
    $overlay.css({
        display: 'none'
    });
});

$('#window-close').click(function(){
   $('.mask').css({
       display: 'none'
   });
});

var $imgGift = $('<img>');
$('.mask').append($imgGift);
$('#noel-image a').click(function(e){
    e.preventDefault();
    var imgLocation = $(this).attr('href');
    var fromIndex = imgLocation.lastIndexOf('/');
    var endIndex = imgLocation.lastIndexOf('.');
    var keyWord = imgLocation.substring(fromIndex + 1, endIndex);
    console.log(imgLocation);
    console.log(fromIndex);
    console.log(endIndex);
    console.log(keyWord);
    if (keyWord <= 16) {
        $imgGift.attr('class', 'pic-height');
    } else {
        $imgGift.attr('class', 'pic-width');
    }    
    $imgGift.attr('src', imgLocation);
    $imgGift.fadeIn(1);
    $('.mask').show();
});

function Media(title, duration, source) {
    this.title = title;
    this.duration = duration;
    this.source = source;
    this.isPlaying = false;
}

Media.prototype.play = function() {
    window.mp3 = new Audio(this.source);
    window.mp3.play();
    this.isPlaying = true;
}

Media.prototype.stop = function() {
    if (window.mp3.played) {
        window.mp3.pause();
    }
    this.isPlaying = false;
}

function Song(title, duration, source, artist) {
    Media.call(this, title, duration, source);
    this.artist = artist;
}

Song.prototype = Object.create(Media.prototype);
Song.prototype.toHTML = function() {
    var liSongItem = document.createElement('li'); 
    if (this.isPlaying) {
        liSongItem.className = 'current';        
        
    }
    liSongItem.textContent = `${this.title} - ${this.artist}`;
    var spanDuration = document.createElement('span');
    spanDuration.className = 'duration';
    spanDuration.innerHTML = this.duration;
    liSongItem.appendChild(spanDuration);
    return liSongItem;
}

function CountElement(fromElement, endElement){
    this.fromElement = fromElement;
    this.endElement = endElement;
}

CountElement.prototype.choosePage = function(page) {
    var amountOfEachPage = 5;    
    this.endElement = amountOfEachPage * page;
    this.fromElement = this.endElement - amountOfEachPage;
    if (this.endElement >= amountAllSong) {
        this.endElement = amountAllSong;
    }
}

function Playlist() {
    this.medias = [];
    this.nowMediaIndex = 0;
}

Playlist.prototype.showPage = function(page) {
    counting.choosePage(page);
    var currentSong = this.findPlayingMedia();
    console.log(currentSong);
    if(currentSong != null){
        currentSong.stop();
    }
    this.medias = myPlayList.medias.slice(counting.fromElement, counting.endElement);  
    this.renderMediaList(); 
}

Playlist.prototype.checkPlayingMedia = function() {
   console.log('chay check');
    var check = false;
    for (let i = 0; i < this.medias.length; i++) {
        if (this.medias[i].isPlaying) {
            check = true;
        }
    }
    console.log(check);
    return check;
}

Playlist.prototype.findPlayingMedia = function() {
    console.log('chay find');
    for (let i = 0; i < this.medias.length; i++) {
        if (this.medias[i].isPlaying) {
            return this.medias[i];
        }
    }
    return null;
}

Playlist.prototype.add = function(media) {
    this.medias.push(media);
}

Playlist.prototype.play = function() {
    console.log('chay play');    
    if (this.checkPlayingMedia() == false) {
        var currentMedia = this.medias[this.nowMediaIndex];
        currentMedia.play();
    }    
}

Playlist.prototype.stop = function() {
    var currentMedia = this.medias[this.nowMediaIndex];
    currentMedia.stop();
}

Playlist.prototype.next = function() {
    this.stop();
    this.nowMediaIndex++;
    if(this.nowMediaIndex == this.medias.length) {
        this.nowMediaIndex = 0;
    }
    this.play();
}

Playlist.prototype.renderMediaList = function() {
    var olTag = document.getElementById('playlist');
    olTag.innerHTML = '';
    for (let i = 0; i < this.medias.length; i++) {
        olTag.appendChild(this.medias[i].toHTML());
    }
    var countOfPage = amountAllSong / 5;
    var pTag = document.createElement('p');
    pTag.setAttribute('id','paging-ball');
    for (let i = 0; i < countOfPage; i++) {
        var spanTag = document.createElement('span');
        var aTag = document.createElement('a');
        aTag.setAttribute('href','#');
        aTag.setAttribute('onclick',`tmpList.showPage(${i + 1})`);
        aTag.textContent = `${i+1}`;
        spanTag.appendChild(aTag);
        pTag.appendChild(spanTag);
    }
    olTag.appendChild(pTag);
}

Playlist.prototype.loadData = function() { //biến tmpList sẽ gọi hàm này để lấy 5 phần tử từ mainList vào , sau đó gọi hàm renderMediaList để show ra 5 phần tử đó vào ta truyền thg MainList để bít số lượng phần tử để tạo element phân trang, sau đó ta biến hằng lên để người lấy tiếp 5 phần tử tiếp theo cho trang kế bên
    this.medias = myPlayList.medias.slice(counting.fromElement, counting.endElement);  
    var currentSong = this.findPlayingMedia();
    console.log(currentSong);
    this.renderMediaList();       
}

var aoMongTinhYeu = new Song('Ao Mong Tinh Yeu','','sound/Ao-Mong-Tinh-Yeu-Hari-Won.mp3','Hari Won');
var choTaGanHon = new Song('Cho Ta Gần Hơn','','sound/Cho-Ta-Gan-Hon-I-m-In-Love-Chi-Pu.mp3','Chi Pu');
var sauKhiChiaTayThiPhaiLamGi = new Song('Sau Khi Chia Tay Thi Minh Lam Gi','','sound/Sau-Khi-Chia-Tay-Thi-Phai-Lam-Gi-Trang-Phap-Huniixo-DJ-XILLIX.mp3','Trang Pháp');
var veVoiEmDi = new Song('Ve Voi Em Di','','sound/Ve-Voi-Em-Di-Touliver-Remix-Tien-Tien-Touliver.mp3','TienTien-Touliver');
var walkAway = new Song('Walk Away','','sound/Walk-Away-Toc-Tien.mp3','Tóc Tiên');
var choHoGhetDiEm = new Song('Cho Ho Ghet Di Em','','sound/Cho-Ho-Ghet-Di-Em-Huynh-James.mp3','Huỳnh James');
var dieuKhacLa = new Song('Dieu Khac La','','sound/Dieu-Khac-La-Masew-Mix-Dat-G-Ngoc-Haleyy-Masew.mp3','Masew-Mix-Dat-G-Ngoc-Haleyy-Masew');
var fightSong = new Song('Fight Song','','sound/FightSong.mp3','Rachel Platten');
var ghen = new Song('Ghen','','sound/Ghen-Khac-Hung-ERIK-MIN.mp3','Khac-Hung-ERIK-MIN');
var laConGaiPhaiXinh = new Song('La Con Gai Phai Xinh','','sound/La-Con-Gai-Phai-Xinh-Bao-Thy-Kimmese.mp3','Bao-Thy-Kimmese');
var lacTroi = new Song('Lac Troi - remix','','sound/Lac-Troi-Triple-D-Remix-Son-Tung-M-TP.mp3','Triple-D-Remix-Son-Tung-M-TP');
var sacMau = new Song('Sac Mau - remix','','sound/Sac-Mau-Remix-S-T-365-Nimbia.mp3','S-T-365-Nimbia');
var tuyAm = new Song('Tuy Am - remix','','sound/Tuy-Am-Xesi-Masew-Nhat-Nguyen.mp3','Xesi-Masew-Nhat-Nguyen');
var veDoiCuaAnh = new Song('Ve Doi Cua Anh','','sound/Ve-Doi-Cua-Anh-Check-Out-Da-Bass-BigDaddy-Touliver.mp3','BigDaddy-Touliver');
var yeu5 = new Song('Yeu 5','','sound/Yeu-5-Rhymastic.mp3','Rhymastic');
var joyToTheWorld = new Song('Joy To The World','','sound/noel-JoyToTheWorld.mp3','Boney M.');
var underneathTheTree = new Song('Underneath-The-Tree','','sound/noel-Underneath-The-Tree-Kelly-Clarkson.mp3','Kelly-Clarkson');
var whiteChristmas = new Song('WhiteChristmas','','sound/noel-WhiteChristmas.mp3','');
var lienKhucGiangSinhChiThienBeBaoAn = new Song('lien Khuc Giang Sinh ChiThien BeBaoAn','','sound/noel-Lien-Khuc-Giang-Sinh-Chi-Thien-Be-Bao-An.mp3','Chi-Thien-Be-Bao-An');
var felizNavidad = new Song('Feliz-Navidad','','sound/noel-Feliz-Navidad-Bao-Anh.mp3','Bao-Anh');
var happyChristmas = new Song('Happy-Christmas','','sound/Happy-Christmas-Hari-Won.mp3','Hari-Won');
var daLoYeuEmNhieu = new Song('Da-Lo-Yeu-Em-Nhieu','','sound/Da-Lo-Yeu-Em-Nhieu-JustaTee.mp3','JustaTee');
var thayLaYeuThuong = new Song('Thay-La-Yeu-Thuong','','sound/Thay-La-Yeu-Thuong-OnlyC.mp3','OnlyC');
var withoutYou = new Song('Without-You','','sound/Without-You-Hari-Won.mp3','Hari-Won');
var songXaAnhChangDeDang = new Song('Song-Xa-Anh-Chang-De-Dang','','sound/Song-Xa-Anh-Chang-De-Dang-Bao-Anh.mp3','Bao-Anh');
var matTroiCuaEm = new Song('Mat-Troi-Cua-Em','','sound/Mat-Troi-Cua-Em-Phuong-Ly-JustaTee.mp3','Phuong-Ly-JustaTee');
var cuoiCungAnhCungDen = new Song('Cuoi-Cung-Anh-Cung-Den','','sound/Cuoi-Cung-Anh-Cung-Den-Hari-Won.mp3','Hari-Won');
var chamKheTimAnhMotChutThoi = new Song('Cham-Khe-Tim-Anh-Mot-Chut-Thoi','','sound/Cham-Khe-Tim-Anh-Mot-Chut-Thoi-Noo-Phuoc-Thinh.mp3','Noo-Phuoc-Thinh');

const myPlayList = new Playlist();
myPlayList.add(happyChristmas);
myPlayList.add(daLoYeuEmNhieu);
myPlayList.add(thayLaYeuThuong);
myPlayList.add(withoutYou);
myPlayList.add(cuoiCungAnhCungDen);
myPlayList.add(matTroiCuaEm);
myPlayList.add(songXaAnhChangDeDang);
myPlayList.add(chamKheTimAnhMotChutThoi);
myPlayList.add(aoMongTinhYeu);
myPlayList.add(choTaGanHon);
myPlayList.add(sauKhiChiaTayThiPhaiLamGi);
myPlayList.add(veVoiEmDi);
myPlayList.add(walkAway);
myPlayList.add(choHoGhetDiEm);
myPlayList.add(dieuKhacLa);
myPlayList.add(fightSong);
myPlayList.add(ghen);
myPlayList.add(laConGaiPhaiXinh);
myPlayList.add(lacTroi);
myPlayList.add(sacMau);
myPlayList.add(tuyAm);
myPlayList.add(veDoiCuaAnh);
myPlayList.add(yeu5);
myPlayList.add(joyToTheWorld);
myPlayList.add(underneathTheTree);
myPlayList.add(whiteChristmas);
myPlayList.add(lienKhucGiangSinhChiThienBeBaoAn);
myPlayList.add(felizNavidad);
const amountAllSong = myPlayList.medias.length;
const counting = new CountElement(0, 5);
var tmpList = new Playlist();
tmpList.loadData();
var playButton = document.getElementById('myPlay');
var stopButton = document.getElementById('myStop');
var nextButton = document.getElementById('myNext');

playButton.onclick = function() {
    tmpList.play();
    tmpList.renderMediaList();
}

stopButton.onclick = function() {
    tmpList.stop();
    tmpList.renderMediaList();
}

nextButton.onclick = function() {
    tmpList.next();
    tmpList.renderMediaList();
}