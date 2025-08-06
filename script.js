document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taxEvaluationForm');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        let yesCount = 0;
        const totalQuestions = 10; // There are 10 questions (q1 to q10)

        for (let i = 1; i <= totalQuestions; i++) {
            const questionName = `q${i}`;
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

            if (!selectedOption) {
                alert('Harap jawab semua pertanyaan sebelum melihat hasil.');
                resultDiv.style.display = 'none';
                return; // Stop execution if any question is not answered
            }

            if (selectedOption.value === 'yes') {
                yesCount++;
            }
        }

        // Interpretasi Hasil
        let interpretation = '';
        if (yesCount >= 9) {
            interpretation = `Anda menjawab "Ya" untuk ${yesCount} pertanyaan.<br><br>Perusahaan Anda sudah menerapkan strategi efisiensi pajak yang sangat baik dan minim risiko pemeriksaan. Pertahankan dan terus pantau regulasi.`;
        } else if (yesCount >= 6) {
            interpretation = `Anda menjawab "Ya" untuk ${yesCount} pertanyaan.<br><br>Sudah ada upaya penghematan dan kehati-hatian, tetapi ada ruang perbaikan dalam dokumentasi, struktur, atau pemanfaatan insentif. Disarankan untuk meninjau area yang belum dijawab "Ya".`;
        } else {
            interpretation = `Anda menjawab "Ya" untuk ${yesCount} pertanyaan.<br><br>Perusahaan Anda berpotensi kehilangan penghematan pajak dan berisiko tinggi terhadap pemeriksaan. Disarankan evaluasi menyeluruh terhadap pencatatan, klaim biaya, dan konsistensi pelaporan. Segera cari konsultasi profesional jika diperlukan.`;
        }

        resultText.innerHTML = interpretation;
        resultDiv.style.display = 'block'; // Show the result box
        resultDiv.scrollIntoView({ behavior: 'smooth' }); // Scroll to result
    });
});
