const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 500;

ctx.strokeStyle = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; /* 라인 굵기 */

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

function sendit() {
  const name = document.getElementById('userid'); // 이름
  const contact = document.getElementById('contact'); // 연락처
  const birthdate = document.getElementById('userpw_re'); // 생년월일
  const membership = document.getElementById('membership'); // 회원권 선택
  const rentalMonths = document.getElementById('rental_months'); // 운동복 대여 개월수
  const lockerMonths = document.getElementById('locker_months'); // 라커 대여 개월수
  const exerciseGoals = document.getElementsByName('goal'); // 운동목적
  const otherGoal = document.getElementById('other'); // 기타 입력 칸
  const paymentMethods = document.getElementsByName('payment'); // 결제 방법
  const zipcode = document.getElementById('sample6_postcode'); // 주소
  const referralSources = document.getElementsByName('referral'); // 가입경로 

  // 정규식
  const expNameText = /^[가-힣]+$/;
  const expContactText = /^\d{3}-\d{4}-\d{4}$/; // 연락처 형식 체크

  if (name.value == '') {
    alert('이름을 입력하세요');
    name.focus();
    return false;
  }

  if (contact.value == '') {
    alert('연락처를 입력하세요');
    contact.focus();
    return false;
  }

  if (!expContactText.test(contact.value)) { // 연락처 형식 체크
    alert('연락처 형식을 확인하세요 (예: 000-0000-0000)');
    contact.focus();
    return false;
  }

  if (!expNameText.test(name.value)) {
    alert('이름 형식을 확인하세요\n한글만 입력가능합니다');
    name.focus();
    return false;
  }

  if (membership.value == '') {
    alert('회원권 선택을 해주세요');
    membership.focus();
    return false;
  }

  if (rentalMonths.value == '' || rentalMonths.value < 1) {
    alert('운동복 대여 개월수를 입력해주세요');
    rentalMonths.focus();
    return false;
  }

  if (lockerMonths.value == '' || lockerMonths.value < 0) {
    alert('라커 대여 개월수를 입력해주세요');
    lockerMonths.focus();
    return false;
  }

  let count = 0;

  for (let i in exerciseGoals) {
    if (exerciseGoals[i].checked) {
      count++;
    }
  }

  if (count == 0) {
    alert('운동목적을 선택하세요');
    return false;
  }

  // 기타 항목 체크
  if (otherGoal.value.trim() !== '') {
    count++;
  }

  // 결제 방법 체크
  let paymentSelected = false;
  for (let i in paymentMethods) {
    if (paymentMethods[i].checked) {
      paymentSelected = true;
      break;
    }
  }

  if (!paymentSelected) {
    alert('결제 방법을 선택하세요');
    return false;
  }

  function formatCurrency(input) {
    // 입력 값에서 숫자만 추출
    let value = input.value.replace(/[^\d]/g, "");

    // 숫자를 3자리 단위로 쉼표 추가
    value = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(value);

    // ₩ 표시 제거 (placeholder가 이미 ₩를 보여주기 때문에 중복 방지)
    value = value.replace("₩", "").trim();

    // 변환된 값을 다시 input에 설정
    input.value = value;
  }

  // 가입경로 체크
  let referralSelected = false;
  for (let i in referralSources) {
    if (referralSources[i].checked) {
      referralSelected = true;
      break;
    }
  }

  if (!referralSelected) {
    alert('가입경로를 선택하세요');
    return false;
  }

  if (zipcode.value == '') {
    alert('주소를 입력하세요');
    zipcode.focus();
    return false;
  }

  return true;
}

function formatBirthdate(input) {
  let value = input.value.replace(/\D/g, '');

  if (value.length === 6) {
    value = '19' + value;
  }

  if (value.length === 8) {
    const year = value.substring(0, 4);
    const month = value.substring(4, 6);
    const day = value.substring(6, 8);
    input.value = `${year}-${month}-${day}`;
  }
}

function moveFocus() {
  const ssn1 = document.getElementById('ssn1');
  if (ssn1.value.length >= 6) {
    document.getElementById('ssn2').focus();
  }
}



