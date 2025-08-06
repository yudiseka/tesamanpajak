const questions = [
  {
    text: "Apakah perusahaan memanfaatkan seluruh insentif pajak yang berlaku (seperti PPh Final UMKM 0,5%, pengurangan angsuran, fasilitas PPN, dll) sesuai ketentuan?"
  },
  {
    text: "Apakah biaya operasional yang diklaim sebagai pengurang penghasilan kena pajak benar-benar terjadi, mendukung usaha, dan memiliki bukti yang sah?"
  },
  {
    text: "Apakah perusahaan melakukan penyusutan dan amortisasi aset menurut ketentuan fiskal (bukan hanya akuntansi)?"
  },
  {
    text: "Apakah perusahaan mempertimbangkan waktu transaksi (timing) untuk menunda laba atau mempercepat biaya dalam batas wajar?"
  },
  {
    text: "Apakah struktur penghasilan pemilik (gaji, bonus, dividen) dipertimbangkan dari sisi efisiensi pajak secara keseluruhan?"
  },
  {
    text: "Apakah perusahaan memiliki pemisahan yang jelas antara keuangan pribadi dan keuangan usaha?"
  },
  {
    text: "Apakah semua transaksi dengan pihak terkait (afiliasi, keluarga, atau perusahaan grup) dilakukan dengan harga wajar (arm's length price)?"
  },
  {
    text: "Apakah perusahaan memiliki dokumen pendukung lengkap (invoice, kontrak, bukti transfer, dll) untuk setiap klaim biaya dan kredit pajak?"
  },
  {
    text: "Apakah perusahaan menghindari pembayaran tunai besar-besaran dan lebih memilih pembayaran non-tunai (transfer, cek, giro)?"
  },
  {
    text: "Apakah laporan keuangan dan SPT tahunan konsisten, tanpa perbedaan signifikan yang tidak dijelaskan?"
  }
];

let answers = new Array(questions.length).fill(null);
let currentQuestion = 0;

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressFill = document.getElementById("progress-fill");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const questionNumSpan = document.getElementById("question-num");
const questionText = document.getElementById("question-text");
const nextBtnText = document.getElementById("next-btn-text");
const yesCountSpan = document.getElementById("yes-count");
const resultText = document.getElementById("result-text");

// Initialize
totalQuestionsSpan.textContent = questions.length;
updateProgress();

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
  currentQuestionSpan.textContent = currentQuestion + 1;
  questionNumSpan.textContent =
