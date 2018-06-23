//  转成blob
function convertBase64UrlToBlob(urlData){
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

//  打开图片
function yasuo(file,w,objDiv){
    var that = this
    var ready = new FileReader()
    ready.readAsDataURL(file)
    ready.onload = function(){
    var re = this.result
    that.canvasDataURL(re, w, objDiv)
    }
}

//  在canvas中重绘
function canvasDataURL(path, obj, callback){
    var that = this
    var img = new Image()
    img.src = path;
    img.onload = function(){
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        canvas.width = 800
        canvas.height = 600
        ctx.drawImage(this,0,0,800,600)
        var base64 = canvas.toDataURL('image/jpeg',0.7)
        callback(base64)
    }
}

// file=>图片
export function img_reduce(file){
    yasuo(file, {qulity:0.2}, function(base64code){
        return convertBase64UrlToBlob(base64code)
    })
}