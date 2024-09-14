document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.stars i');
    let rating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function () {
            rating = this.getAttribute('data-value');
            stars.forEach(star => star.classList.remove('filled'));
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('filled');
            }
        });
    });

    document.getElementById('submit-review').addEventListener('click', function () {
        const reviewText = document.getElementById('review-text').value;
        if (rating && reviewText) {
            fetch('submit_review.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: rating,
                    review: reviewText
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Értékelés sikeresen elküldve!');
                location.reload();
            })
            .catch(error => console.error('Hiba történt:', error));
        } else {
            alert('Kérjük, adj meg egy értékelést és egy szöveges véleményt!');
        }
    });
});
