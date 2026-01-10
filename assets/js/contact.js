document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
    }

    const payload = {
      name: form.name?.value?.trim() || '',
      email: form.email?.value?.trim() || '',
      subject: form.subject?.value || '',
      message: form.message?.value?.trim() || '',
      _captcha: 'false',
      _subject: 'New Message from ASKBTM Website'
    };

    try {
      const res = await fetch('https://formsubmit.co/ajax/fadm94202@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        // Success alert
        if (window.Swal) {
          Swal.fire({
            icon: 'success',
            title: 'Thank you! 🎉',
            text: 'Your message has been sent successfully.',
            showConfirmButton: false,
            timer: 2200,
            willClose: () => {
              // Redirect to contact anchor (works on both Index and Support)
              try { window.location.hash = '#contact'; } catch (_) {}
            }
          });
        }
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        if (window.Swal) {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: data?.message || 'Something went wrong. Please try again later.'
          });
        }
      }
    } catch (err) {
      if (window.Swal) {
        Swal.fire({
          icon: 'error',
          title: 'Network error',
          text: 'Please check your connection and try again.'
        });
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
      }
    }
  });
});
