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

// DOM Elements
let questionContainer, resultContainer, prevBtn, nextBtn, progressFill;
let currentQuestionSpan, totalQuestionsSpan, questionNumSpan, questionText;
let nextBtnText, yesCountSpan, resultText, resetBtn;
let optionYa, optionTidak;

function initializeElements() {
  questionContainer = document.getElementById("question-container");
  resultContainer = document.getElementById("result-container");
  prevBtn = document.getElementById("prev-btn");
  nextBtn = document.getElementById("next-btn");
  progressFill = document.getElementById("progress-fill");
  currentQuestionSpan = document.getElementById("current-question");
  totalQuestionsSpan = document.getElementById("total-questions");
  questionNumSpan = document.getElementById("question-num");
  questionText = document.getElementById("question-text");
  nextBtnText = document.getElementById("next-btn-text");
  yesCountSpan = document.getElementById("yes-count");
  resultText = document.getElementById("result-text");
  resetBtn = document.getElementById("reset-btn");
  optionYa = document.getElementById("option-ya");
  optionTidak = document.getElementById("option-tidak");
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
  currentQuestionSpan.textContent = currentQuestion + 1;
  questionNumSpan.textContent = currentQuestion + 1;
}

function showQuestion(index) {
  const question = questions[index];
  questionText.textContent = question.text;
  
  // Clear previous selections
  optionYa.classList.remove('selected');
  optionTidak.classList.remove('selected');
  
  // Select if answer exists
  if (answers[index]) {
    if (answers[index] === "Ya") {
      optionYa.classList.add('selected');
    } else {
      optionTidak.classList.add('selected');
    }
  }
  
  // Update button text
  nextBtnText.textContent = index === questions.length - 1 ? "Selesai" : "Selanjutnya";
  
  // Update navigation buttons
  prevBtn.disabled = index === 0;
  updateNextButtonState();
  
  updateProgress();
}

function updateNextButtonState() {
  const isSelected = answers[currentQuestion] !== null;
  nextBtn.disabled = !isSelected;
}

// Event Listeners
function setupEventListeners() {
  // Option card click events
  optionYa.addEventListener('click', function() {
    optionYa.classList.add('selected');
    optionTidak.classList.remove('selected');
    answers[currentQuestion] = "Ya";
    updateNextButtonState();
  });

  optionTidak.addEventListener('click', function() {
    optionTidak.classList.add('selected');
    optionYa.classList.remove('selected');
    answers[currentQuestion] = "Tidak";
    updateNextButtonState();
  });

  // Navigation
  prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (answers[currentQuestion] === null) {
      return; // Don't proceed if no answer selected
    }
    
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    } else {
      showResult();
    }
  });

  // Reset button
  resetBtn.addEventListener('click', resetQuiz);
}

function showResult() {
  const yesCount = answers.filter(a => a === "Ya").length;
  let interpretation = "";

  if (yesCount >= 9) {
    interpretation = "✅ <strong>Perusahaan sudah menerapkan strategi efisiensi pajak yang baik dan minim risiko pemeriksaan.</strong><br><br>Pertahankan dan terus pantau regulasi terbaru untuk memastikan kepatuhan yang optimal.";
  } else if (yesCount >= 6) {
    interpretation = "⚠️ <strong>Sudah ada upaya penghematan dan kehati-hatian, tetapi ada ruang perbaikan.</strong><br><br>Fokus pada peningkatan dokumentasi, struktur perpajakan, dan pemanfaatan insentif secara maksimal.";
  } else {
    interpretation = "❌ <strong>Berpotensi kehilangan penghematan pajak dan berisiko tinggi terhadap pemeriksaan.</strong><br><br>Disarankan evaluasi menyeluruh terhadap pencatatan, klaim biaya, dan konsistensi pelaporan keuangan.";
  }

  yesCountSpan.textContent = yesCount;
  resultText.innerHTML = interpretation;
  
  questionContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  document.querySelector('.navigation').classList.add('hidden');
}

function resetQuiz() {
  answers = new Array(questions.length).fill(null);
  currentQuestion = 0;
  
  resultContainer.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  document.querySelector('.navigation').classList.remove('hidden');
  
  showQuestion(currentQuestion);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  totalQuestionsSpan.textContent = questions.length;
  setupEventListeners();
  showQuestion(currentQuestion);
});
