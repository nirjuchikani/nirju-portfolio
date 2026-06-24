document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    setupContactForm();
});

// Fetch projects dynamically from the database API
async function fetchProjects() {
    const container = document.getElementById('projects-container');
    try {
        const response = await fetch('/api/projects');
        const resData = await response.json();

        if (!resData.success || resData.count === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No projects found in the database. Use your favorite database client or seed script to populate data records.</p>
                </div>`;
            return;
        }

        // Render project item cards dynamically
        container.innerHTML = resData.data.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                <div class="card-links">
                    ${project.githubLink ? `<a href="${project.githubLink}" target="_blank"><i class="fab fa-github"></i> Source</a>` : ''}
                    ${project.liveLink ? `<a href="${project.liveLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<div class="error-state"><p>Failed to connect to backend api routes.</p></div>';
    }
}

// Handle Contact Form Form Submission
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const responseDiv = document.getElementById('form-response');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            responseDiv.className = 'form-alert status-loading';
            responseDiv.innerText = 'Transmitting data payload to server...';

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (result.success) {
                responseDiv.className = 'form-alert status-success';
                responseDiv.innerText = result.message;
                form.reset();
            } else {
                responseDiv.className = 'form-alert status-error';
                responseDiv.innerText = result.error || 'Submission failed.';
            }
        } catch (err) {
            console.error('Submission error:', err);
            responseDiv.className = 'form-alert status-error';
            responseDiv.innerText = 'Network error occurred. Connection failed.';
        }
    });
}