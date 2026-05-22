// ==========================================
// AERO TASK - CORE APPLICATION SCRIPTS
// ==========================================

// Global state
let tasks = [];
let activeView = 'kanban';

// Date utility for greeting and dates
const todayStr = new Date().toISOString().split('T')[0];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial setups
    initDates();
    checkAuthentication();
    loadTasks();
    setupEventListeners();
    renderAllViews();
});

// Setup minimum dates and display today's date
function initDates() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    const dateDisplay = document.getElementById('current-date-display');
    if (dateDisplay) {
        dateDisplay.textContent = today.toLocaleDateString('en-US', options);
    }
    
    // Set default dates on the task form inputs to today
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    if (startDateInput) startDateInput.value = todayStr;
    if (endDateInput) endDateInput.value = todayStr;
}

// Password visibility toggle
const toggleBtn = document.getElementById('toggle-password');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const pwInput = document.getElementById('password');
        const icon = document.getElementById('eye-icon');
        if (pwInput.type === 'password') {
            pwInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            pwInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
}

// ==========================================
// AUTHENTICATION LOGIC
// ==========================================

function checkAuthentication() {
    const loggedIn = sessionStorage.getItem('aerotask_logged_in') === 'true';
    const loginPage = document.getElementById('login-page');
    const appDashboard = document.getElementById('app-dashboard');

    if (loggedIn) {
        if (loginPage) loginPage.style.display = 'none';
        if (appDashboard) appDashboard.style.display = 'flex';
    } else {
        if (loginPage) loginPage.style.display = 'flex';
        if (appDashboard) appDashboard.style.display = 'none';
    }
}

// ==========================================
// STATE & STORAGE MANAGEMENT
// ==========================================

function loadTasks() {
    const stored = localStorage.getItem('aerotask_tasks');
    if (stored) {
        tasks = JSON.parse(stored);
    } else {
        tasks = [
            {
                name: "Go to Church",
                desc: "Attend Sunday morning service and prayer session.",
                startDate: "2026-05-21",
                endDate: "2026-05-25",
                progress: "Not Started",
                priority: "High",
                tag: "Personal"
            },
            {
                name: "Read JavaScript Book",
                desc: "Finish chapters 5-8 of Eloquent JavaScript.",
                startDate: "2026-05-21",
                endDate: "2026-05-28",
                progress: "Started",
                priority: "Medium",
                tag: "Personal"
            },
            {
                name: "Grocery Shopping",
                desc: "Buy vegetables, fruits, bread, and coffee for the week.",
                startDate: "2026-05-21",
                endDate: "2026-05-22",
                progress: "Not Started",
                priority: "Low",
                tag: "Personal"
            },
            {
                name: "Complete Portfolio Website",
                desc: "Finalize all project pages and deploy to Netlify.",
                startDate: "2026-05-18",
                endDate: "2026-05-21",
                progress: "Finished",
                priority: "High",
                tag: "Code"
            },
            {
                name: "Morning Workout Routine",
                desc: "30 min cardio and stretching exercises every morning.",
                startDate: "2026-05-21",
                endDate: "2026-05-30",
                progress: "Started",
                priority: "Medium",
                tag: "Personal"
            }
        ];
        saveTasks();
    }
    populateCategoryFilter();
}

function saveTasks() {
    localStorage.setItem('aerotask_tasks', JSON.stringify(tasks));
}

// Populate the Category dropdown filter with all unique tags present in tasks
function populateCategoryFilter() {
    const filter = document.getElementById('tag-filter');
    if (!filter) return;
    
    // Save current selected value
    const selected = filter.value;
    
    // Gather all tags
    const tags = new Set();
    tasks.forEach(t => { if (t.tag) tags.add(t.tag); });
    
    // Setup initial html
    let html = '<option value="All">All Categories</option>';
    tags.forEach(tag => {
        html += `<option value="${tag}">${tag}</option>`;
    });
    
    filter.innerHTML = html;
    
    // Restore selection if it still exists
    if (tags.has(selected)) {
        filter.value = selected;
    } else {
        filter.value = 'All';
    }
}

// ==========================================
// EVENT LISTENERS BINDING
// ==========================================

function setupEventListeners() {
    // Login form submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const u = document.getElementById('username').value;
            const p = document.getElementById('password').value;
            
            if (u === 'admin' && p === '12345') {
                sessionStorage.setItem('aerotask_logged_in', 'true');
                checkAuthentication();
                renderAllViews();
                document.getElementById('login-error').style.display = 'none';
            } else {
                const errorAlert = document.getElementById('login-error');
                errorAlert.style.display = 'flex';
            }
        });
    }

    // Demo credentials login button
    const demoBtn = document.getElementById('demo-login-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            document.getElementById('username').value = 'admin';
            document.getElementById('password').value = '12345';
            
            // Trigger submit
            if (loginForm) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('aerotask_logged_in');
            checkAuthentication();
        });
    }

    // Navigation Tab Switching
    const sidebarNav = document.querySelectorAll('.sidebar-nav li');
    sidebarNav.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarNav.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            activeView = item.getAttribute('data-view');
            switchView(activeView);
        });
    });

    // Add Task Button - Header
    const addTaskHeaderBtn = document.getElementById('add-task-header-btn');
    if (addTaskHeaderBtn) {
        addTaskHeaderBtn.addEventListener('click', () => openTaskModal());
    }

    // Modal close controls
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeTaskModal);
    
    const cancelBtn = document.getElementById('task-form-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', closeTaskModal);

    // Save/Submit task form
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveTaskForm();
        });
    }

    // Filters and sorting change events
    const priorityFilter = document.getElementById('priority-filter');
    if (priorityFilter) priorityFilter.addEventListener('change', () => renderAllViews());

    const tagFilter = document.getElementById('tag-filter');
    if (tagFilter) tagFilter.addEventListener('change', () => renderAllViews());

    const sortBy = document.getElementById('sort-by');
    if (sortBy) sortBy.addEventListener('change', () => renderAllViews());

    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.addEventListener('input', () => renderAllViews());

    // Notification Panel Toggle
    const notifTrigger = document.getElementById('notification-trigger');
    const notifPanel = document.getElementById('notification-panel');
    const closeNotifBtn = document.getElementById('close-notifications-btn');

    if (notifTrigger && notifPanel) {
        notifTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            notifPanel.style.display = notifPanel.style.display === 'none' ? 'flex' : 'none';
        });
    }

    if (closeNotifBtn && notifPanel) {
        closeNotifBtn.addEventListener('click', () => {
            notifPanel.style.display = 'none';
        });
    }

    // Close notifications panel when clicking outside
    document.addEventListener('click', (e) => {
        if (notifPanel && notifPanel.style.display === 'flex' && !notifPanel.contains(e.target) && e.target !== notifTrigger) {
            notifPanel.style.display = 'none';
        }
    });

    // Drag-and-drop container drops
    setupDragAndDrop();
}

function switchView(viewName) {
    const views = ['kanban', 'list', 'grid'];
    views.forEach(v => {
        const pane = document.getElementById(`view-${v}`);
        if (pane) {
            pane.classList.remove('active');
        }
    });
    
    const activePane = document.getElementById(`view-${viewName}`);
    if (activePane) activePane.classList.add('active');
}

// ==========================================
// DRAG AND DROP
// ==========================================

function setupDragAndDrop() {
    const dropzones = document.querySelectorAll('.dropzone');
    
    dropzones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            const taskIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const targetStatus = zone.parentElement.getAttribute('data-status');
            
            if (!isNaN(taskIndex) && tasks[taskIndex]) {
                const prevStatus = tasks[taskIndex].progress;
                tasks[taskIndex].progress = targetStatus;
                
                // If it just transitioned to Completed, celebrate!
                if (targetStatus === 'Finished' && prevStatus !== 'Finished') {
                    triggerConfetti();
                }
                
                saveTasks();
                renderAllViews();
            }
        });
    });
}

// ==========================================
// TASK FORM HANDLING (MODAL)
// ==========================================

function openTaskModal(index = null) {
    const modal = document.getElementById('task-modal');
    const modalTitle = document.getElementById('modal-title');
    const taskForm = document.getElementById('task-form');
    const editIndexInput = document.getElementById('edit-task-index');
    
    taskForm.reset();
    
    if (index !== null && tasks[index]) {
        // Edit Mode
        modalTitle.textContent = "Edit Task";
        editIndexInput.value = index;
        
        const task = tasks[index];
        document.getElementById('task-name').value = task.name;
        document.getElementById('task-desc').value = task.desc || '';
        document.getElementById('start-date').value = task.startDate || todayStr;
        document.getElementById('end-date').value = task.endDate || todayStr;
        document.getElementById('progress-status').value = task.progress;
        document.getElementById('priority').value = task.priority;
        document.getElementById('task-tag').value = task.tag || 'Work';
    } else {
        // Create Mode
        modalTitle.textContent = "Create New Task";
        editIndexInput.value = "";
        
        document.getElementById('start-date').value = todayStr;
        document.getElementById('end-date').value = todayStr;
        document.getElementById('progress-status').value = "Not Started";
        document.getElementById('priority').value = "Low";
        document.getElementById('task-tag').value = "Work";
    }
    
    modal.style.display = 'flex';
}

function closeTaskModal() {
    const modal = document.getElementById('task-modal');
    modal.style.display = 'none';
}

function saveTaskForm() {
    const indexStr = document.getElementById('edit-task-index').value;
    const name = document.getElementById('task-name').value;
    const desc = document.getElementById('task-desc').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const progress = document.getElementById('progress-status').value;
    const priority = document.getElementById('priority').value;
    const tag = document.getElementById('task-tag').value;

    if (!name.trim()) {
        alert("Task Title is required!");
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        alert("Due Date must be equal to or after the Start Date.");
        return;
    }

    const taskObj = {
        name,
        desc,
        startDate,
        endDate,
        progress,
        priority,
        tag
    };

    if (indexStr === "") {
        // Create New
        tasks.push(taskObj);
        if (progress === 'Finished') {
            triggerConfetti();
        }
    } else {
        // Update Existing
        const index = parseInt(indexStr);
        const prevStatus = tasks[index].progress;
        tasks[index] = taskObj;
        if (progress === 'Finished' && prevStatus !== 'Finished') {
            triggerConfetti();
        }
    }

    saveTasks();
    populateCategoryFilter();
    closeTaskModal();
    renderAllViews();
}

function deleteTask(index) {
    if (confirm(`Are you sure you want to delete "${tasks[index].name}"?`)) {
        tasks.splice(index, 1);
        saveTasks();
        populateCategoryFilter();
        renderAllViews();
    }
}

function cycleProgress(index, e) {
    if (e) e.stopPropagation();
    const task = tasks[index];
    const prevStatus = task.progress;
    
    if (task.progress === 'Not Started') {
        task.progress = 'Started';
    } else if (task.progress === 'Started') {
        task.progress = 'Finished';
        triggerConfetti();
    } else {
        task.progress = 'Not Started';
    }
    
    saveTasks();
    renderAllViews();
}

// ==========================================
// RENDER & VIEWS REFRESH
// ==========================================

function renderAllViews() {
    if (sessionStorage.getItem('aerotask_logged_in') !== 'true') return;
    
    // Get filter states
    const searchVal = document.getElementById('search-input').value.toLowerCase().trim();
    const priorityVal = document.getElementById('priority-filter').value;
    const tagVal = document.getElementById('tag-filter').value;
    const sortVal = document.getElementById('sort-by').value;
    
    // Filter tasks
    let filtered = tasks.map((task, originalIndex) => ({ ...task, originalIndex }));
    
    if (searchVal) {
        filtered = filtered.filter(t => 
            t.name.toLowerCase().includes(searchVal) || 
            (t.desc && t.desc.toLowerCase().includes(searchVal))
        );
    }
    
    if (priorityVal !== 'All') {
        filtered = filtered.filter(t => t.priority === priorityVal);
    }
    
    if (tagVal !== 'All') {
        filtered = filtered.filter(t => t.tag === tagVal);
    }
    
    // Sort tasks
    filtered.sort((a, b) => {
        if (sortVal === 'endDate-asc') {
            return new Date(a.endDate) - new Date(b.endDate);
        } else if (sortVal === 'endDate-desc') {
            return new Date(b.endDate) - new Date(a.endDate);
        } else if (sortVal === 'priority-desc') {
            const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return priorityWeight[b.priority] - priorityWeight[a.priority];
        } else if (sortVal === 'name-asc') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    // Update statistics counters and notifications
    calculateMetrics();

    // Render individual sub-views
    renderKanbanBoard(filtered);
    renderListView(filtered);
    renderGridView(filtered);
}

function calculateMetrics() {
    let total = tasks.length;
    let inProgress = tasks.filter(t => t.progress === 'Started').length;
    let completed = tasks.filter(t => t.progress === 'Finished').length;
    
    // Overdue: Due date is less than today and not Finished
    let overdueTasks = tasks.filter(t => t.progress !== 'Finished' && t.endDate < todayStr);
    let overdueCount = overdueTasks.length;

    // Set DOM elements
    document.getElementById('metric-total').textContent = total;
    document.getElementById('metric-progress').textContent = inProgress;
    document.getElementById('metric-completed').textContent = completed;
    document.getElementById('metric-overdue').textContent = overdueCount;

    // Notifications Badge
    const badge = document.getElementById('overdue-count-badge');
    if (badge) {
        if (overdueCount > 0) {
            badge.textContent = overdueCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    // Build notifications panel content
    const listContainer = document.getElementById('notification-list');
    if (listContainer) {
        if (overdueCount === 0) {
            listContainer.innerHTML = `
                <div class="empty-state-placeholder" style="padding: 20px; border: none; background: transparent;">
                    <i class="fas fa-check-circle" style="font-size: 24px; opacity: 0.5;"></i>
                    <p style="font-size: 13px;">All tasks are on track! No overdue items.</p>
                </div>
            `;
        } else {
            let html = '';
            overdueTasks.forEach(task => {
                html += `
                    <div class="notification-item urgent">
                        <div class="notif-title"><i class="fas fa-exclamation-triangle"></i> Overdue Task</div>
                        <p><strong>${task.name}</strong> was due on ${task.endDate}.</p>
                        <div class="notif-time">${task.priority} Priority</div>
                    </div>
                `;
            });
            listContainer.innerHTML = html;
        }
    }
}

// --- Render Board Pane ---
function renderKanbanBoard(filteredTasks) {
    const colNotStarted = document.getElementById('cards-not-started');
    const colStarted = document.getElementById('cards-started');
    const colFinished = document.getElementById('cards-finished');
    
    colNotStarted.innerHTML = '';
    colStarted.innerHTML = '';
    colFinished.innerHTML = '';

    let counts = { 'Not Started': 0, 'Started': 0, 'Finished': 0 };

    filteredTasks.forEach(task => {
        counts[task.progress]++;
        const card = createCardElement(task);
        
        if (task.progress === 'Not Started') {
            colNotStarted.appendChild(card);
        } else if (task.progress === 'Started') {
            colStarted.appendChild(card);
        } else if (task.progress === 'Finished') {
            colFinished.appendChild(card);
        }
    });

    document.getElementById('count-not-started').textContent = counts['Not Started'];
    document.getElementById('count-started').textContent = counts['Started'];
    document.getElementById('count-finished').textContent = counts['Finished'];
}

// Helper to construct a single task card DOM node
function createCardElement(task) {
    const card = document.createElement('div');
    card.className = `task-card-item`;
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-index', task.originalIndex);
    
    // Drag events
    card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', task.originalIndex);
    });
    
    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });

    // Check overdue
    const isOverdue = task.progress !== 'Finished' && task.endDate < todayStr;
    const dateClass = isOverdue ? 'card-dates overdue' : 'card-dates';
    const dateIcon = isOverdue ? '<i class="fas fa-circle-exclamation"></i>' : '<i class="far fa-calendar"></i>';
    const dateText = isOverdue ? `Overdue (Due: ${task.endDate})` : `Due: ${task.endDate}`;

    let progressButtonText = "Not Started";
    if (task.progress === 'Started') progressButtonText = "In Progress";
    if (task.progress === 'Finished') progressButtonText = "Completed";

    card.innerHTML = `
        <div class="card-top">
            <span class="card-tag ${task.tag.toLowerCase()}">${task.tag}</span>
            <span class="card-priority ${task.priority.toLowerCase()}">
                <i class="fas fa-circle" style="font-size: 8px;"></i> ${task.priority}
            </span>
        </div>
        <h4>${task.name}</h4>
        <p class="desc">${task.desc || 'No description provided.'}</p>
        <div class="${dateClass}">
            ${dateIcon} <span>${dateText}</span>
        </div>
        <div class="card-actions">
            <button class="btn-progress-cycle" onclick="cycleProgress(${task.originalIndex}, event)">
                ${progressButtonText}
            </button>
            <div class="actions-right">
                <button class="btn-card-action" onclick="openTaskModal(${task.originalIndex})" title="Edit Task">
                    <i class="fas fa-pen-to-square"></i>
                </button>
                <button class="btn-card-action delete" onclick="deleteTask(${task.originalIndex})" title="Delete Task">
                    <i class="fas fa-trash-can"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// --- Render List Pane ---
function renderListView(filteredTasks) {
    const tbody = document.getElementById('table-tasks-body');
    const emptyState = document.getElementById('list-empty-state');
    
    tbody.innerHTML = '';
    
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'flex';
        return;
    } else {
        emptyState.style.display = 'none';
    }

    filteredTasks.forEach(task => {
        const tr = document.createElement('tr');
        
        let statusBadgeText = "Not Started";
        if (task.progress === 'Started') statusBadgeText = "In Progress";
        if (task.progress === 'Finished') statusBadgeText = "Completed";

        const isOverdue = task.progress !== 'Finished' && task.endDate < todayStr;
        const dueDateStyle = isOverdue ? 'color: #fca5a5; font-weight: 600;' : '';

        tr.innerHTML = `
            <td>
                <div class="table-task-cell">
                    <h4>${task.name}</h4>
                    <p>${task.desc || 'No description'}</p>
                </div>
            </td>
            <td><span class="card-tag ${task.tag.toLowerCase()}">${task.tag}</span></td>
            <td style="color: var(--text-muted); font-size: 13px;">${task.startDate}</td>
            <td style="font-size: 13px; ${dueDateStyle}">
                ${isOverdue ? '<i class="fas fa-circle-exclamation" style="margin-right: 4px;"></i>' : ''} ${task.endDate}
            </td>
            <td>
                <span class="card-priority ${task.priority.toLowerCase()}">
                    <i class="fas fa-circle" style="font-size: 8px; margin-right: 4px;"></i> ${task.priority}
                </span>
            </td>
            <td>
                <span class="table-status-badge ${task.progress.replace(' ', '')}">${statusBadgeText}</span>
            </td>
            <td class="actions-col">
                <div class="table-actions">
                    <button class="btn-card-action" onclick="cycleProgress(${task.originalIndex})" title="Toggle Progress">
                        <i class="fas fa-rotate"></i>
                    </button>
                    <button class="btn-card-action" onclick="openTaskModal(${task.originalIndex})" title="Edit Task">
                        <i class="fas fa-pen-to-square"></i>
                    </button>
                    <button class="btn-card-action delete" onclick="deleteTask(${task.originalIndex})" title="Delete Task">
                        <i class="fas fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Render Grid Pane ---
function renderGridView(filteredTasks) {
    const gridContainer = document.getElementById('grid-tasks-container');
    const emptyState = document.getElementById('grid-empty-state');
    
    gridContainer.innerHTML = '';
    
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'flex';
        return;
    } else {
        emptyState.style.display = 'none';
    }

    filteredTasks.forEach(task => {
        const card = createCardElement(task);
        gridContainer.appendChild(card);
    });
}


// ==========================================
// CONFETTI ANIMATION (CELEBRATION EFFECT)
// ==========================================

let confettiAnimationId = null;

function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const colors = ['#7c3aed', '#2563eb', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];
    const particles = [];
    
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -100 - 10,
            radius: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 5 + 3,
            speedX: Math.random() * 4 - 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }

    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
    }
    
    let frameCount = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let activeParticles = 0;
        
        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            
            if (p.y < canvas.height) {
                activeParticles++;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                
                // Draw a small confetti ribbon
                ctx.fillRect(-p.radius, -p.radius / 2, p.radius * 2, p.radius);
                ctx.restore();
            }
        });
        
        frameCount++;
        
        if (activeParticles > 0 && frameCount < 200) {
            confettiAnimationId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

// Adjust canvas dimensions if resized during animation
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas && confettiAnimationId) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
