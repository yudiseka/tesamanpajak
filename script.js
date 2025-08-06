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
    text: "Apakah semua transaksi dengan pihak terkait (afiliasi, keluarga, atau perusahaan grup) dilakukan dengan harga wajar (arm’s length price)?"
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
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");

function showQuestion(index) {
  const question = questions[index];
  questionContainer.innerHTML = `
    <div class="question">${question.text}</div>
    <div class="options">
      <div class="option ${answers[index] === 'Ya' ? 'selected' : ''}" data-answer="Ya">Ya</div>
      <div class="option ${answers[index] === 'Tidak' ? 'selected' : ''}" data-answer="Tidak">Tidak</div>
    </div>
  `;

  document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
      option.classList.add("selected");
      answers[index] = option.getAttribute("data-answer");
    });
  });

  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === questions.length - 1 ? "Selesai" : "Selanjutnya";
}

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  } else {
    showResult();
  }
});

function showResult() {
  const yesCount = answers.filter(a => a === "Ya").length;
  let interpretation = "";

  if (yesCount >= 9) {
    interpretation = "Perusahaan sudah menerapkan strategi efisiensi pajak yang baik dan minim risiko pemeriksaan. Pertahankan dan terus pantau regulasi.";
  } else if (yesCount >= 6) {
    interpretation = "Sudah ada upaya penghematan dan kehati-hatian, tetapi ada ruang perbaikan dalam dokumentasi, struktur, atau pemanfaatan insentif.";
  } else {
    interpretation = "Berpotensi kehilangan penghematan pajak dan berisiko tinggi terhadap pemeriksaan. Disarankan evaluasi menyeluruh terhadap pencatatan, klaim biaya, dan konsistensi pelaporan.";
  }

  resultText.textContent = `Jawaban "Ya": ${yesCount} dari ${questions.length}\n\n${interpretation}`;
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  document.querySelector(".navigation").classList.add("hidden");
}

showQuestion(currentQuestion);
