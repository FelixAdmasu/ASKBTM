// Blog Scripts
document.addEventListener('DOMContentLoaded', function () {
    // Pagination variables
    const postsPerPage = 7;
    let currentPage = 1;
    let filteredCards = [];
    let currentFilter = 'all';
    
    // Get DOM elements
    const categoryButtons = document.querySelectorAll('.blog__category');
    const blogCards = Array.from(document.querySelectorAll('.blog__card'));
    const paginationContainer = document.querySelector('.blog__pagination');
    
    // Initialize pagination
    function initPagination() {
        // Show first page by default
        updatePaginationUI();
        showPage(1);
    }

    // Filter blog cards by category
    function filterCards(category) {
        currentFilter = category;
        currentPage = 1; // Reset to first page when changing filters
        
        if (category === 'all') {
            filteredCards = [...blogCards];
        } else {
            // Normalize both the filter and card categories for comparison
            const normalizedFilter = category.toLowerCase().replace(/\s+/g, '-');
            filteredCards = blogCards.filter(card => {
                const cardCategory = card.getAttribute('data-category');
                return cardCategory === normalizedFilter;
            });
        }
        
        updatePaginationUI();
        showPage(1);
    }

    // Show specific page of blog posts
    function showPage(pageNumber) {
        currentPage = pageNumber;
        const startIndex = (pageNumber - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedCards = filteredCards.slice(startIndex, endIndex);
        
        // Hide all cards first
        blogCards.forEach(card => card.style.display = 'none');
        
        // Show only cards for current page
        paginatedCards.forEach(card => {
            card.style.display = '';
            if (card.classList.contains('blog__card--featured')) {
                card.style.gridColumn = '1 / -1';
                card.style.display = 'flex';
            }
        });
        
        // Update active page button
        document.querySelectorAll('.blog__page-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === pageNumber) {
                btn.classList.add('active');
            }
        });
    }

    // Update pagination UI based on filtered cards
    function updatePaginationUI() {
        const totalPages = Math.ceil(filteredCards.length / postsPerPage);
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `<button class="blog__page-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
            <i class="ri-arrow-left-line"></i> Prev
        </button>`;
        
        // Page numbers
        const maxVisiblePages = 3;
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (startPage > 1) {
            paginationHTML += `<button class="blog__page-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="blog__page-dots">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="blog__page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="blog__page-dots">...</span>`;
            }
            paginationHTML += `<button class="blog__page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        // Next button
        paginationHTML += `<button class="blog__page-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
            Next <i class="ri-arrow-right-line"></i>
        </button>`;
        
        paginationContainer.innerHTML = paginationHTML;
        
        // Add event listeners to pagination buttons
        document.querySelectorAll('.blog__page-btn').forEach(btn => {
            const page = btn.getAttribute('data-page');
            if (page) {
                btn.addEventListener('click', () => {
                    showPage(parseInt(page));
                });
            }
        });
    }
    
    // Initialize with all cards
    filteredCards = [...blogCards];
    
    // Add click event to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            let category = button.textContent.trim();
            if (category === 'Success Stories') {
                category = 'success-stories';
            } else {
                category = category.toLowerCase();
            }
            filterCards(category === 'all' ? 'all' : category);
        });
    });
    
    // Initialize pagination
    initPagination();

    // Modal functionality
    const modalBtns = document.querySelectorAll('.blog__read-more');
    const modals = document.querySelectorAll('.blog-modal');
    const closeBtns = document.querySelectorAll('.blog-modal__close, .blog-modal__overlay');

    // Open modal
    modalBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.blog-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });

    // Copy modal content
    const copyButtons = document.querySelectorAll('.blog-modal__copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const modal = this.closest('.blog-modal');
            const contentContainer = modal.querySelector('.blog-modal__content');
            
            // Get all paragraph elements and combine their text
            const paragraphs = Array.from(contentContainer.querySelectorAll('p'));
            const content = paragraphs.map(p => p.textContent.trim()).join('\n\n');
            
            // Get the blog title and date for context
            const title = modal.querySelector('.blog-modal__title')?.textContent || '';
            const date = modal.querySelector('.blog-modal__date')?.textContent || '';
            const author = modal.querySelector('.blog-modal__author')?.textContent || '';
            
            // Create a nicely formatted text with title, date, author, and content
            const fullContent = `${title}\n${date} • ${author}\n\n${content}`;

            try {
                // Use the modern Clipboard API
                await navigator.clipboard.writeText(fullContent);
                
                const icon = this.querySelector('i');
                const originalIcon = icon.className;
                const originalText = this.innerHTML;
                
                // Update button to show success
                this.innerHTML = '<i class="ri-check-line"></i> Copied!';
                this.classList.add('copied');
                
                // Revert after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('copied');
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
                // Fallback for older browsers
                try {
                    const textarea = document.createElement('textarea');
                    textarea.value = fullContent;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    
                    const icon = this.querySelector('i');
                    const originalText = this.innerHTML;
                    
                    this.innerHTML = '<i class="ri-check-line"></i> Copied!';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                } catch (fallbackErr) {
                    console.error('Fallback copy failed: ', fallbackErr);
                    this.innerHTML = '<i class="ri-close-line"></i> Failed';
                    setTimeout(() => {
                        this.innerHTML = '<i class="ri-file-copy-2-line"></i> Copy Content';
                    }, 2000);
                }
            }
        });
    });

    // Add copy to clipboard functionality for share buttons
    const shareButtons = document.querySelectorAll('.blog__share-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.getAttribute('data-content');
            const textarea = document.createElement('textarea');
            textarea.value = content;
            document.body.appendChild(textarea);
            textarea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    // Change icon to checkmark temporarily
                    const icon = this.querySelector('i');
                    const originalIcon = icon.className;
                    icon.className = 'ri-check-line';

                    // Revert back after 2 seconds
                    setTimeout(() => {
                        icon.className = originalIcon;
                    }, 2000);
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }

            document.body.removeChild(textarea);
        });
    });
});
