document.addEventListener('DOMContentLoaded', function() {
    // Photo Upload and Preview
    const photoInput = document.getElementById('profile-photo');
    const photoPreview = document.getElementById('photo-preview');
    
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photoPreview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Add Experience Button
    const addExperienceBtn = document.getElementById('add-experience');
    const experienceContainer = document.getElementById('experience-container');

    addExperienceBtn.addEventListener('click', function() {
        const newExperience = document.createElement('div');
        newExperience.className = 'experience-item';
        newExperience.innerHTML = `
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" name="experience-title[]" required>
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" name="experience-company[]" required>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" name="experience-duration[]" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="experience-description[]" rows="3" required></textarea>
            </div>
            <button type="button" class="remove-button" onclick="this.parentElement.remove()">
                <i class="fas fa-trash"></i> Remove Experience
            </button>
        `;
        experienceContainer.appendChild(newExperience);
    });

    // Add Education Button
    const addEducationBtn = document.getElementById('add-education');
    const educationContainer = document.getElementById('education-container');

    addEducationBtn.addEventListener('click', function() {
        const newEducation = document.createElement('div');
        newEducation.className = 'education-item';
        newEducation.innerHTML = `
            <div class="form-group">
                <label>Degree</label>
                <input type="text" name="education-degree[]" required>
            </div>
            <div class="form-group">
                <label>Institute</label>
                <input type="text" name="education-institute[]" required>
            </div>
            <div class="form-group">
                <label>Year</label>
                <input type="text" name="education-year[]" required>
            </div>
            <button type="button" class="remove-button" onclick="this.parentElement.remove()">
                <i class="fas fa-trash"></i> Remove Education
            </button>
        `;
        educationContainer.appendChild(newEducation);
    });

    // Add Project Button
    const addProjectBtn = document.getElementById('add-project');
    const projectContainer = document.getElementById('projects-container');

    addProjectBtn.addEventListener('click', function() {
        const newProject = document.createElement('div');
        newProject.className = 'project-item';
        newProject.innerHTML = `
            <div class="form-group">
                <label>Project Title</label>
                <input type="text" name="project-title[]" required>
            </div>
            <div class="form-group">
                <label>Project Link</label>
                <input type="url" name="project-link[]" placeholder="https://github.com/username/project">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="project-description[]" rows="3" required></textarea>
            </div>
            <button type="button" class="remove-button" onclick="this.parentElement.remove()">
                <i class="fas fa-trash"></i> Remove Project
            </button>
        `;
        projectContainer.appendChild(newProject);
    });

    // Preview Resume Button
    const previewButton = document.getElementById('preview-resume');
    const resumePreview = document.getElementById('resume-preview');
    const resumeForm = document.getElementById('resume-form');

    previewButton.addEventListener('click', function() {
        // Hide form and show preview
        resumeForm.style.display = 'none';
        resumePreview.style.display = 'block';
        
        // Generate preview content
        const formData = new FormData(resumeForm);
        const previewContent = generatePreviewContent(formData);
        resumePreview.innerHTML = previewContent;

        // Add action buttons
        const previewActions = document.createElement('div');
        previewActions.className = 'preview-actions';
        previewActions.innerHTML = `
            <button class="back-button" onclick="backToForm()">
                <i class="fas fa-arrow-left"></i> Back to Form
            </button>
            <button class="download-button" onclick="generatePDF()">
                <i class="fas fa-download"></i> Download PDF
            </button>
        `;
        document.body.appendChild(previewActions);
    });

    // Back to Form Function
    window.backToForm = function() {
        resumeForm.style.display = 'block';
        resumePreview.style.display = 'none';
        document.querySelector('.preview-actions').remove();
    };

    // Generate PDF Function
    window.generatePDF = function() {
        const element = document.getElementById('resume-preview');
        const downloadButton = document.querySelector('.download-button');
        const originalText = downloadButton.innerHTML;
        
        // Show loading state
        downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        downloadButton.disabled = true;

        // Create a temporary container
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '8.5in';
        tempContainer.style.padding = '0.75in';
        tempContainer.style.background = 'white';
        tempContainer.style.color = 'black';
        tempContainer.style.fontFamily = 'Arial, sans-serif';
        tempContainer.style.fontSize = '10pt';
        tempContainer.style.lineHeight = '1.3';
        tempContainer.style.boxSizing = 'border-box';

        // Copy the content with optimized spacing
        tempContainer.innerHTML = `
            <div style="
                width: 100%;
                max-width: 6.5in;
                margin: 0 auto;
                padding: 0.5in;
                background: white;
                font-size: 10pt;
                line-height: 1.3;
            ">
                <style>
                    .preview-content h1 { font-size: 18pt; margin-bottom: 10px; }
                    .preview-content h2 { font-size: 14pt; margin-bottom: 6px; margin-top: 14px; }
                    .preview-content h3 { font-size: 11pt; margin-bottom: 5px; }
                    .preview-content p { font-size: 10pt; margin-bottom: 3px; }
                    .preview-content li { font-size: 10pt; margin-bottom: 2px; }
                    .preview-content .skill-tag { font-size: 9pt; margin: 2px; }
                    .preview-section { margin-bottom: 10px; }
                    .education-item { page-break-inside: avoid; margin-bottom: 8px; }
                    .experience-item { page-break-inside: avoid; margin-bottom: 8px; }
                    .project-item { page-break-inside: avoid; margin-bottom: 8px; }
                    .contact-info { margin-bottom: 12px; }
                    .preview-header { margin-bottom: 15px; }
                    .preview-photo { width: 100px; height: 100px; }
                    .preview-photo img { width: 100%; height: 100%; object-fit: cover; }
                </style>
                ${element.innerHTML}
            </div>
        `;
        document.body.appendChild(tempContainer);

        // Generate PDF using html2canvas and jspdf
        html2canvas(tempContainer, {
            scale: 2,
            useCORS: true,
            logging: true,
            allowTaint: true,
            backgroundColor: '#FFFFFF'
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter'
            });

            const imgWidth = 8.5;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pageHeight = 11;
            const margin = 0.75;

            // Add white background to first page
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, 0, 8.5, 11, 'F');

            // Add content with proper margins and scaling
            const scale = Math.min(
                (pageHeight - (2 * margin)) / imgHeight,
                (imgWidth - (2 * margin)) / imgWidth
            );

            const scaledWidth = imgWidth * scale;
            const scaledHeight = imgHeight * scale;

            const x = (imgWidth - scaledWidth) / 2;
            const y = (pageHeight - scaledHeight) / 2;

            // Add clickable links for social media and project links
            const links = [];
            const linkElements = tempContainer.querySelectorAll('a');
            linkElements.forEach(link => {
                const rect = link.getBoundingClientRect();
                const linkX = x + (rect.left / tempContainer.offsetWidth) * scaledWidth;
                const linkY = y + (rect.top / tempContainer.offsetHeight) * scaledHeight;
                const linkWidth = (rect.width / tempContainer.offsetWidth) * scaledWidth;
                const linkHeight = (rect.height / tempContainer.offsetHeight) * scaledHeight;
                links.push({
                    x: linkX,
                    y: linkY,
                    width: linkWidth,
                    height: linkHeight,
                    url: link.href
                });
            });

            pdf.addImage(
                imgData,
                'JPEG',
                x,
                y,
                scaledWidth,
                scaledHeight,
                null,
                'FAST'
            );

            // Add clickable links to the PDF
            links.forEach(link => {
                pdf.link(link.x, link.y, link.width, link.height, { url: link.url });
            });

            // If content height exceeds page height, add a second page
            if (imgHeight > (pageHeight - (2 * margin))) {
                pdf.addPage();
                pdf.setFillColor(255, 255, 255);
                pdf.rect(0, 0, 8.5, 11, 'F');
                
                // Calculate the remaining content height
                const remainingHeight = imgHeight - (pageHeight - (2 * margin));
                
                // Add remaining content to second page
                pdf.addImage(
                    imgData,
                    'JPEG',
                    x,
                    margin,
                    scaledWidth,
                    remainingHeight,
                    null,
                    'FAST'
                );

                // Add clickable links for the second page
                links.forEach(link => {
                    if (link.y > (pageHeight - (2 * margin))) {
                        const secondPageY = link.y - (pageHeight - (2 * margin));
                        pdf.link(link.x, secondPageY, link.width, link.height, { url: link.url });
                    }
                });
            }

            pdf.save('resume.pdf');

            // Clean up
            document.body.removeChild(tempContainer);
            downloadButton.innerHTML = originalText;
            downloadButton.disabled = false;
            showMessage('PDF downloaded successfully!', 'success');
        }).catch(error => {
            console.error('Error generating PDF:', error);
            showMessage('Error generating PDF. Please try again.', 'error');
            downloadButton.innerHTML = originalText;
            downloadButton.disabled = false;
            document.body.removeChild(tempContainer);
        });
    };

    // Show message function
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
            ${message}
        `;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }

    // Helper function to generate preview content
    function generatePreviewContent(formData) {
        // Get all form values with fallbacks
        const fullName = formData.get('full-name') || '';
        const jobTitle = formData.get('job-title') || '';
        const phone = formData.get('phone') || '';
        const email = formData.get('email') || '';
        const address = formData.get('address') || '';
        const profileSummary = formData.get('profile-summary') || '';
        const keySkills = formData.get('key-skills') || '';
        const github = formData.get('github') || '';
        const linkedin = formData.get('linkedin') || '';
        const portfolio = formData.get('portfolio') || '';

        // Get photo preview
        const photoPreview = document.getElementById('photo-preview');
        const photoHTML = photoPreview.innerHTML;

        // Get project items
        const projectTitles = formData.getAll('project-title[]') || [];
        const projectLinks = formData.getAll('project-link[]') || [];
        const projectDescriptions = formData.getAll('project-description[]') || [];

        // Generate HTML content
        return `
            <div class="preview-content">
                <div class="preview-header">
                    <div class="preview-photo">
                        ${photoHTML}
                    </div>
                    <div class="preview-info">
                        <h1>${fullName}</h1>
                        <h2>${jobTitle}</h2>
                        <div class="contact-info" style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 10px;">
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <p style="margin: 0;"><i class="fas fa-phone"></i> ${phone}</p>
                                <p style="margin: 0;"><i class="fas fa-envelope"></i> ${email}</p>
                                <p style="margin: 0;"><i class="fas fa-map-marker-alt"></i> ${address}</p>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${github ? `<p style="margin: 0;"><i class="fab fa-github"></i> <a href="${github}" target="_blank" style="text-decoration: none; color: inherit;">GitHub</a></p>` : ''}
                                ${linkedin ? `<p style="margin: 0;"><i class="fab fa-linkedin"></i> <a href="${linkedin}" target="_blank" style="text-decoration: none; color: inherit;">LinkedIn</a></p>` : ''}
                                ${portfolio ? `<p style="margin: 0;"><i class="fas fa-globe"></i> <a href="${portfolio}" target="_blank" style="text-decoration: none; color: inherit;">Portfolio</a></p>` : ''}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="preview-section">
                    <h2>Profile Summary</h2>
                    <p>${profileSummary}</p>
                </div>

                <div class="preview-section">
                    <h2>Professional Experience</h2>
                    ${generateExperienceHTML(formData)}
                </div>

                <div class="preview-section">
                    <h2>Education</h2>
                    ${generateEducationHTML(formData)}
                </div>

                <div class="preview-section">
                    <h2>Projects</h2>
                    <div class="project-list">
                        ${projectTitles.map((title, index) => `
                            <div class="project-item" style="margin-bottom: 15px;">
                                <h4 style="color: black; font-size: 14px; margin: 5px 0;">
                                    ${title}
                                    ${projectLinks[index] ? `<a href="${projectLinks[index]}" target="_blank" style="font-size: 12px; color: #666; margin-left: 10px;">
                                        <i class="fas fa-external-link-alt"></i> View Project
                                    </a>` : ''}
                                </h4>
                                <p style="margin: 5px 0;">${projectDescriptions[index]}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="preview-section">
                    <h2>Skills</h2>
                    <div class="skills-container">
                        ${keySkills.split('\n').map(skill => `
                            <span class="skill-tag">${skill.trim()}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Helper function to generate experience HTML
    function generateExperienceHTML(formData) {
        // Get experience items
        const experienceTitles = formData.getAll('experience-title[]') || [];
        const experienceCompanies = formData.getAll('experience-company[]') || [];
        const experienceDurations = formData.getAll('experience-duration[]') || [];
        const experienceDescriptions = formData.getAll('experience-description[]') || [];

        return `
            <div class="experience-list">
                ${experienceTitles.map((title, index) => `
                    <div class="experience-item" style="margin-bottom: 15px;">
                        <h4 style="color: black; font-size: 14px; margin: 5px 0;">${title}</h4>
                        <p style="margin: 5px 0;">${experienceCompanies[index]}</p>
                        <p style="margin: 5px 0;">${experienceDurations[index]}</p>
                        <p style="margin: 5px 0;">${experienceDescriptions[index]}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Helper function to generate education HTML
    function generateEducationHTML(formData) {
        // Get education items
        const educationDegrees = formData.getAll('education-degree[]') || [];
        const educationInstitutes = formData.getAll('education-institute[]') || [];
        const educationYears = formData.getAll('education-year[]') || [];

        return `
            <div class="education-list">
                ${educationDegrees.map((degree, index) => `
                    <div class="education-item" style="margin-bottom: 15px;">
                        <h4 style="color: black; font-size: 14px; margin: 5px 0;">${degree}</h4>
                        <p style="margin: 5px 0;">${educationInstitutes[index]}</p>
                        <p style="margin: 5px 0;">${educationYears[index]}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
});