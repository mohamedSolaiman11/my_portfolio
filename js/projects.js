import { db, collection, getDocs, query, orderBy } from './firebase.js';

export async function renderProjects() {
    const container = document.getElementById("firestoreProjects");
    if (!container) return;

    try {
        console.log("Attempting to fetch projects...");
        
    
        const projectsRef = collection(db, "projects");
        const snapshot = await getDocs(projectsRef);
        
        container.innerHTML = "";

        if (snapshot.empty) {
            console.log("No projects found in Firestore.");
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                    <p style="color: var(--text-dim);">No projects found in the database.</p>
                    <a href="admin.html" class="btn-primary-sm" style="display:inline-block; margin-top:10px;">Add Your First Project</a>
                </div>`;
            return;
        }

        const projects = [];
        snapshot.forEach(docSnap => {
            projects.push({ id: docSnap.id, ...docSnap.data() });
        });

        projects.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        projects.forEach(p => {
            const projectHTML = createProjectCard(p.id, p);
            container.innerHTML += projectHTML;
        });

        console.log("Projects rendered successfully.");

    } catch (error) {
        console.error("Detailed Error:", error);
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: #ff4d4d; padding: 20px;">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load projects. Error: ${error.message}</p>
                <p style="font-size: 0.8rem; color: var(--text-dim);">Check your Firebase rules or internet connection.</p>
            </div>`;
    }
}

function createProjectCard(id, data) {
    const tags = data.techStack ? data.techStack.split(',').slice(0, 3).map(tag => `<span class="tag">${tag.trim()}</span>`).join('') : '';
    const imgUrl = data.coverImage || data.imageUrl || 'images/placeholder.jpg';
    
    return `
        <div class="work">
            <img src="${imgUrl}" alt="${data.appName || 'Project'}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
            <div class="work-info">
                <div class="work-header">
                    <h3>${data.appName || data.name || 'Untitled Project'}</h3>
                    <span class="category-tag">${data.category || 'Mobile'}</span>
                </div>
                <p>${data.tagline || data.desc || 'Flutter Mobile Application'}</p>
                <div class="tech-stack-tags">${tags}</div>
                <div class="work-actions">
                    <a href="project-details.html?id=${id}" class="btn-primary-sm">View Case Study</a>
                    <div class="icon-links">
                        ${data.githubLink ? `<a href="${data.githubLink}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                        ${data.videoLink ? `<a href="${data.videoLink}" target="_blank"><i class="fas fa-play"></i></a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// استدعاء مباشر لضمان التشغيل
renderProjects();
