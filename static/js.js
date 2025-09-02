function togglePostingBox() {
  const box = $("#postingBox");
  box.toggle()
  if (box.is(':visible')) {
    $('#btn-text-box').text('포스팅박스 닫기')
  }
  else {
    $('#btn-text-box').text('포스팅박스 열기')
  }
}

$(document).ready(function () {
  $("#card-container").html("");
  showArticles();
});

function postArticle() {
  // 1. 유저가 입력한 데이터를 #post-url과 #post-comment에서 가져오기
  let url = $("#post-url").val();
  let comment = $("#post-comment").val();

  // 2. memo에 POST 방식으로 메모 생성 요청하기
  $.ajax({
    type: "POST", // POST 방식으로 요청하겠다.
    url: "/memo", // /memo라는 url에 요청하겠다.
    data: { url_give: url, comment_give: comment }, // 데이터를 주는 방법
    success: function (response) { // 성공하면
      if (response["result"] == "success") {
        alert("포스팅 성공!");
        // 3. 성공 시 페이지 새로고침하기
        window.location.reload();
      } else {
        alert("서버 오류!")
      }
    }
  })
}

function showArticles() {
  $.ajax({
    type: "GET",
    url: "/memo",
    data: {},
    success: function (response) {
      let articles = response["articles"];
      for (let i = 0; i < articles.length; i++) {
        makeCard(articles[i]["image"], articles[i]["url"], articles[i]["title"], articles[i]["desc"], articles[i]["comment"])
      }
    }
  })
}

function makeCard(image, url, title, desc, comment) {
  let temp_html = `<div class="card">
    <img src="${image}" class="card-img-top" alt="이미지를 불러올 수 없습니다.">
      <div class="card-body">
        <a href="${url}" target="_blank" class="card--title">${title}</a>
        <p class="card--text">${desc}</p>
        <p class="card-comment">${comment}</p>
      </div>
  </div>`;
  {/* let temp_html = `<div class="card">
                        <img class="card-img-top" src="${image}" alt="Card image cap">
                        <div class="card-body">
                        <a href="${url}" target="_blank" class="card-title">${title}</a>
                        <p class="card-text">${desc}</p>
                        <p class="card-text comment">${comment}</p>
                        </div>
                    </div>`; */}
  $("#card-container").append(temp_html);
}
