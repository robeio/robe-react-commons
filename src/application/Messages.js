const error = {
    203: "Non-Authoritative Information	Yetersiz Bilgi",
    205: "Reset Content	İçeriği Baştan al",
    206: "Partial Content	Kısmi İçerik",
    210: "Content Different	WebDAV :Farklı İçerik",
    305: "Use Proxy	Proxy Kullan",
    400: "Bad Request	Kötü İstek",
    401: "Unauthorized	Yetkisiz",
    402: "Payment Required	Ödeme Gerekli",
    403: "Forbidden	Yasaklandı",
    404: "Page Not Found",
    405: "İzin verilmeyen Metod",
    406: "Not Acceptable	Kabul Edilemez",
    407: "Proxy Sunucuda login olmak gerekli",
    408: "İstek zaman aşamına uğradı",
    409: "Conflict	(Hatlar) Çakıştı,Çakışma",
    410: "Gone	Bak",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Long",
    415: "Unsupported Media Type",
    416: "Requested range unsatifiable",
    417: "Expectation failed",
    422: "Unprocessable entity	WebDAV :",
    423: "Locked	WebDAV :",
    424: "Method failure	WebDAV :",
    500: "Internal Server Error",
    501: "Uygulanmamış",
    502: "Geçersiz Ağ Geçidi",
    503: "Hizmet Yok",
    504: "Gateway Timeout",
    505: "HTTP Version not supported",
    507: "Insufficient storage	WebDAV",
    508: "Wrong URL ",
    520: "Requested JSON parse failed.",
    521: "Time out error.",
    523: "Ajax request aborted."
};

const info = {
    100: "Continue	Devam",
    101: "Switching Protocols	Anahtarlama Protokolü",
    102: "Processing	WebDAV : İşlem",
    200: "OK	Tamam",
    201: "Created	Oluşturuldu",
    202: "Accepted	Onaylandı",
    204: "No Content	İçerik Yok",
    207: "Multi-Status	WebDAV :Çok-Statü",
    300: "Multiple Choices	Çok Seçenek",
    301: "Moved Permanently	Kalıcı Taşındı",
    302: "Moved Temporarily	Geçici Taşındı",
    303: "See Other	Diğerlerine Bak",
    304: "Not Modified	Güncellenmedi",
    307: "Temporary Redirect	Geçici olarak yeniden gönder"
};

const Messages = {
    error: error,
    info: info
};

export default Messages;
