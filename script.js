document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENTS ---
    const body = document.body;
    const mainPage = document.getElementById('main-page');
    const settingsPage = document.getElementById('settings-page');
    const clockElement = document.getElementById('clock');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    // Buttons
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const addSectionBtn = document.getElementById('add-section-btn');
    const addLinkBtn = document.getElementById('add-link-btn');
    const addFriendlyLinkBtn = document.getElementById('add-friendly-link-btn');
    const exportConfigBtn = document.getElementById('export-config-btn');
    const importConfigBtn = document.getElementById('import-config-btn');
    const importFileInput = document.getElementById('import-file-input');
    
    // Main Page Content
    const sectionTabsContainer = document.getElementById('section-tabs');
    const sectionContentsContainer = document.getElementById('section-contents');
    const friendlyLinksContainer = document.getElementById('friendly-links-container');
    
    // Settings Inputs
    const uiStyleSelect = document.getElementById('ui-style-select');
    const themeColorInput = document.getElementById('theme-color-input');
    const fontFamilySelect = document.getElementById('font-family-select');
    const fontSizeInput = document.getElementById('font-size-input');
    const fontSizeValue = document.getElementById('font-size-value');
    const fontColorInput = document.getElementById('font-color-input');
    const sectionManagementContainer = document.getElementById('section-management-container');
    const newSectionNameInput = document.getElementById('new-section-name');
    const linkSectionSelect = document.getElementById('link-section-select');
    const linkManagementContainer = document.getElementById('link-management-container');
    const newLinkNameInput = document.getElementById('new-link-name');
    const newLinkUrlInput = document.getElementById('new-link-url');
    const searchEngineSelect = document.getElementById('search-engine-select');
    const clockStyleSelect = document.getElementById('clock-style-select');
    const friendlyLinkManagementContainer = document.getElementById('friendly-link-management-container');
    const newFnameInput = document.getElementById('new-fname');
    const newFurlInput = document.getElementById('new-furl');
    
    // --- CONFIGURATION ---
    let config = {};
    let clockInterval;

    const defaultConfig = {
        theme: 'light',
        uiStyle: 'default',
        colors: {
            accent: '#007bff',
            text: '#333333',
        },
        font: {
            family: "'Noto Sans SC', sans-serif",
            size: 16,
        },
        searchEngine: 'https://www.bing.com/search?q=',
        clockStyle: 'HH:mm:ss',
        sections: [
            {
                name: '学习',
                links: [
                    { name: 'W3CSchool', url: 'https://www.w3school.com.cn' },
                    { name: '菜鸟教程', url: 'https://www.runoob.com' },
                ]
            },
            {
                name: '娱乐',
                links: [
                    { name: 'Bilibili', url: 'https://www.bilibili.com' },
                    { name: '腾讯视频', url: 'https://v.qq.com' },
                ]
            },
            {
                name: '资源',
                links: [
                    { name: 'GitHub', url: 'https://github.com' },
                    { name: 'Gitee', url: 'https://gitee.com' },
                ]
            }
        ],
        friendlyLinks: [
            { name: '关于本项目', url: 'https://github.com/Xerome/CustomizingNavigationWebPages' },
        ]
    };

    const options = {
        uiStyles: [
            { value: 'default', text: '默认风格' },
            { value: 'ui-style-glassmorphism', text: '玻璃拟态' },
            { value: 'ui-style-neomorphism', text: '新拟态' },
            { value: 'ui-style-minimal-white', text: '简约白' },
            { value: 'ui-style-vibrant-orange', text: '活力橙' },
            { value: 'ui-style-ink-painting', text: '墨韵国风' },
            { value: 'ui-style-pixel-game', text: '像素游戏' },
            { value: 'ui-style-handwritten', text: '手写笔记' },
        ],
        fontFamilies: [
            { value: "'Noto Sans SC', sans-serif", text: '思源黑体 (默认)' },
            { value: "'ZCOOL KuaiLe', cursive", text: '站酷快乐体' },
            { value: "'Long Cang', cursive", text: '龙藏体 (手写)' },
            { value: "'Ma Shan Zheng', cursive", text: '马善政毛笔' },
            { value: "'Zhi Mang Xing', cursive", text: '之芒行书' },
            { value: "'Fira Code', monospace", text: 'Fira Code (代码)' },
            { value: "'Press Start 2P', cursive", text: 'Press Start (像素)' },
            { value: "'Kalam', cursive", text: 'Kalam (手写)' },
            { value: "'Dancing Script', cursive", text: 'Dancing Script (艺术)' },
            { value: "'Orbitron', sans-serif", text: 'Orbitron (科技)' },
        ],
        searchEngines: [
            { value: 'https://www.bing.com/search?q=', text: '必应 (Bing)' },
            { value: 'https://www.baidu.com/s?wd=', text: '百度 (Baidu)' },
            { value: 'https://www.google.com/search?q=', text: '谷歌 (Google)' },
            { value: 'https://www.sogou.com/web?query=', text: '搜狗 (Sogou)' },
            { value: 'https://www.so.com/s?q=', text: '360搜索' },
            { value: 'https://quark.sm.cn/s?q=', text: '夸克 (Quark)' },
        ],
        clockStyles: [
            { value: 'HH:mm:ss', text: '24小时制 (时:分:秒)' },
            { value: 'HH:mm', text: '24小时制 (时:分)' },
            { value: 'hh:mm:ss A', text: '12小时制 (时:分:秒)' },
            { value: 'YYYY-MM-DD HH:mm:ss', text: '年-月-日 时:分:秒' },
            { value: 'YYYY年MM月DD日', text: 'xxxx年xx月xx日' },
            { value: 'MM-DD-YYYY', text: '月-日-年' },
            { value: 'dddd', text: '星期几' },
            { value: 'YYYY-MM-DD dddd', text: '年-月-日 星期几' },
            { value: 'LTS', text: '本地化时间 (长)' },
            { value: 'LL', text: '本地化日期 (长)' },
        ]
    };

    // --- CORE FUNCTIONS ---
    function saveConfig() {
        localStorage.setItem('resourceNavConfig', JSON.stringify(config));
    }

    function loadConfig() {
        const savedConfig = localStorage.getItem('resourceNavConfig');
        if (savedConfig) {
            config = { ...defaultConfig, ...JSON.parse(savedConfig) };
             // Deep merge for nested objects to prevent data loss on updates
            config.colors = { ...defaultConfig.colors, ...(config.colors || {}) };
            config.font = { ...defaultConfig.font, ...(config.font || {}) };
        } else {
            config = JSON.parse(JSON.stringify(defaultConfig)); // Deep copy
        }
    }

    function applyConfig() {
        // 1. Theme (dark/light)
        if (config.theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }

        // 2. UI Style
        body.className = body.className.replace(/ui-style-\w+/g, '').trim();
        if (config.uiStyle && config.uiStyle !== 'default') {
            body.classList.add(config.uiStyle);
        }
        if (config.theme === 'dark') body.classList.add('dark-mode');
        
        // 3. Colors & Fonts
        document.documentElement.style.setProperty('--accent-color', config.colors.accent);
        document.documentElement.style.setProperty('--text-color', config.colors.text);
        document.documentElement.style.setProperty('--font-family', config.font.family);
        document.documentElement.style.setProperty('--font-size', `${config.font.size}px`);

        // 4. Search Engine
        searchForm.action = config.searchEngine.split('?')[0];
        const queryParam = (new URLSearchParams(config.searchEngine.split('?')[1])).keys().next().value || 'q';
        searchInput.name = queryParam;


        // 5. Render dynamic content
        renderMainPage();
        updateClock(); // To apply style change immediately
    }

    // --- RENDER FUNCTIONS ---
    function renderMainPage() {
        // Render Section Tabs
        sectionTabsContainer.innerHTML = '';
        config.sections.forEach((section, index) => {
            const tab = document.createElement('div');
            tab.className = 'tab';
            tab.textContent = section.name;
            tab.dataset.index = index;
            sectionTabsContainer.appendChild(tab);
        });

        // Render Section Contents
        sectionContentsContainer.innerHTML = '';
        config.sections.forEach((section, index) => {
            const contentPanel = document.createElement('div');
            contentPanel.className = 'content-panel';
            contentPanel.dataset.index = index;
            section.links.forEach(link => {
                const linkDiv = document.createElement('div');
                linkDiv.className = 'content-link';
                linkDiv.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a>`;
                contentPanel.appendChild(linkDiv);
            });
            sectionContentsContainer.appendChild(contentPanel);
        });

        // Activate first tab by default
        if (config.sections.length > 0) {
            sectionTabsContainer.children[0]?.classList.add('active');
            sectionContentsContainer.children[0]?.classList.add('active');
        }

        // Render Friendly Links
        friendlyLinksContainer.innerHTML = '';
        config.friendlyLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.name;
            a.target = '_blank';
            friendlyLinksContainer.appendChild(a);
        });
    }

    function populateSelect(selectElement, optionsArray, selectedValue) {
        selectElement.innerHTML = '';
        optionsArray.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            selectElement.appendChild(opt);
        });
        selectElement.value = selectedValue;
    }

    function renderSettings() {
        // Populate all select dropdowns
        populateSelect(uiStyleSelect, options.uiStyles, config.uiStyle);
        populateSelect(fontFamilySelect, options.fontFamilies, config.font.family);
        populateSelect(searchEngineSelect, options.searchEngines, config.searchEngine);
        populateSelect(clockStyleSelect, options.clockStyles, config.clockStyle);

        // Set values for other inputs
        themeColorInput.value = config.colors.accent;
        fontColorInput.value = config.colors.text;
        fontSizeInput.value = config.font.size;
        fontSizeValue.textContent = `${config.font.size}px`;

        // Render management sections
        renderSectionManagement();
        renderLinkManagement();
        renderFriendlyLinkManagement();
    }

    function renderSectionManagement() {
        sectionManagementContainer.innerHTML = '';
        config.sections.forEach((section, index) => {
            const item = document.createElement('div');
            item.className = 'management-item';
            item.innerHTML = `<span>${section.name}</span><button data-index="${index}">删除</button>`;
            sectionManagementContainer.appendChild(item);
        });
    }

    function renderLinkManagement() {
        // Populate link section selector first
        linkSectionSelect.innerHTML = '';
        config.sections.forEach((section, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = section.name;
            linkSectionSelect.appendChild(opt);
        });

        // Then render links for the currently selected section
        const selectedIndex = linkSectionSelect.value;
        linkManagementContainer.innerHTML = '';
        if (selectedIndex !== '' && config.sections[selectedIndex]) {
            config.sections[selectedIndex].links.forEach((link, linkIndex) => {
                const item = document.createElement('div');
                item.className = 'management-item';
                item.innerHTML = `<span>${link.name} (${link.url})</span><button data-section-index="${selectedIndex}" data-link-index="${linkIndex}">删除</button>`;
                linkManagementContainer.appendChild(item);
            });
        }
    }
    
    function renderFriendlyLinkManagement() {
        friendlyLinkManagementContainer.innerHTML = '';
        config.friendlyLinks.forEach((link, index) => {
            const item = document.createElement('div');
            item.className = 'management-item';
            item.innerHTML = `<span>${link.name} (${link.url})</span><button data-index="${index}">删除</button>`;
            friendlyLinkManagementContainer.appendChild(item);
        });
    }

    // --- CLOCK FUNCTION ---
    function updateClock() {
        if (clockInterval) clearInterval(clockInterval);
        
        const formatTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
            const hours24 = String(now.getHours()).padStart(2, '0');
            const hours12 = String(now.getHours() % 12 || 12).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

            switch (config.clockStyle) {
                case 'HH:mm:ss': return `${hours24}:${minutes}:${seconds}`;
                case 'HH:mm': return `${hours24}:${minutes}`;
                case 'hh:mm:ss A': return `${hours12}:${minutes}:${seconds} ${ampm}`;
                case 'YYYY-MM-DD HH:mm:ss': return `${year}-${month}-${day} ${hours24}:${minutes}:${seconds}`;
                case 'YYYY年MM月DD日': return `${year}年${month}月${day}日`;
                case 'MM-DD-YYYY': return `${month}-${day}-${year}`;
                case 'dddd': return weekday;
                case 'YYYY-MM-DD dddd': return `${year}-${month}-${day} ${weekday}`;
                case 'LTS': return now.toLocaleTimeString();
                case 'LL': return now.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' });
                default: return `${hours24}:${minutes}:${seconds}`;
            }
        };

        clockElement.textContent = formatTime();
        clockInterval = setInterval(() => {
            clockElement.textContent = formatTime();
        }, 1000);
    }
    
    // --- EVENT LISTENERS ---
    
    // Main Page Interactions
    themeToggleBtn.addEventListener('click', () => {
        config.theme = config.theme === 'light' ? 'dark' : 'light';
        saveConfig();
        applyConfig();
    });

    settingsBtn.addEventListener('click', () => {
        renderSettings();
        mainPage.style.display = 'none';
        settingsPage.style.display = 'flex';
    });
    
    closeSettingsBtn.addEventListener('click', () => {
        mainPage.style.display = 'flex';
        settingsPage.style.display = 'none';
    });

    sectionTabsContainer.addEventListener('mouseover', e => {
        if (e.target.classList.contains('tab')) {
            const index = e.target.dataset.index;
            // Deactivate all
            sectionTabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            sectionContentsContainer.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
            // Activate hovered
            e.target.classList.add('active');
            sectionContentsContainer.querySelector(`.content-panel[data-index='${index}']`)?.classList.add('active');
        }
    });

    // Settings Page Interactions
    const handleSettingChange = (key, value, subkey = null) => {
        if (subkey) {
            config[key][subkey] = value;
        } else {
            config[key] = value;
        }
        saveConfig();
        applyConfig();
    };

    uiStyleSelect.addEventListener('change', e => handleSettingChange('uiStyle', e.target.value));
    themeColorInput.addEventListener('input', e => handleSettingChange('colors', e.target.value, 'accent'));
    fontColorInput.addEventListener('input', e => handleSettingChange('colors', e.target.value, 'text'));
    fontFamilySelect.addEventListener('change', e => handleSettingChange('font', e.target.value, 'family'));
    fontSizeInput.addEventListener('input', e => {
        fontSizeValue.textContent = `${e.target.value}px`;
        handleSettingChange('font', parseInt(e.target.value, 10), 'size');
    });
    searchEngineSelect.addEventListener('change', e => handleSettingChange('searchEngine', e.target.value));
    clockStyleSelect.addEventListener('change', e => handleSettingChange('clockStyle', e.target.value));

    // Management Actions
    addSectionBtn.addEventListener('click', () => {
        const name = newSectionNameInput.value.trim();
        if (name) {
            config.sections.push({ name, links: [] });
            newSectionNameInput.value = '';
            saveConfig();
            applyConfig();
            renderSettings();
        }
    });

    sectionManagementContainer.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const index = parseInt(e.target.dataset.index, 10);
            config.sections.splice(index, 1);
            saveConfig();
            applyConfig();
            renderSettings();
        }
    });
    
    linkSectionSelect.addEventListener('change', renderLinkManagement);

    addLinkBtn.addEventListener('click', () => {
        const sectionIndex = linkSectionSelect.value;
        const name = newLinkNameInput.value.trim();
        let url = newLinkUrlInput.value.trim();
        if (sectionIndex !== '' && name && url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            config.sections[sectionIndex].links.push({ name, url });
            newLinkNameInput.value = '';
            newLinkUrlInput.value = '';
            saveConfig();
            applyConfig();
            renderLinkManagement();
        }
    });
    
    linkManagementContainer.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const sectionIndex = parseInt(e.target.dataset.sectionIndex, 10);
            const linkIndex = parseInt(e.target.dataset.linkIndex, 10);
            config.sections[sectionIndex].links.splice(linkIndex, 1);
            saveConfig();
            applyConfig();
            renderLinkManagement();
        }
    });
    
    addFriendlyLinkBtn.addEventListener('click', () => {
        const name = newFnameInput.value.trim();
        let url = newFurlInput.value.trim();
        if (name && url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            config.friendlyLinks.push({ name, url });
            newFnameInput.value = '';
            newFurlInput.value = '';
            saveConfig();
            applyConfig();
            renderFriendlyLinkManagement();
        }
    });

    friendlyLinkManagementContainer.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const index = parseInt(e.target.dataset.index, 10);
            config.friendlyLinks.splice(index, 1);
            saveConfig();
            applyConfig();
            renderFriendlyLinkManagement();
        }
    });

    // Import / Export
    exportConfigBtn.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "resource-nav-config.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    importConfigBtn.addEventListener('click', () => importFileInput.click());
    
    importFileInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const importedConfig = JSON.parse(event.target.result);
                // Simple validation
                if (importedConfig.sections && importedConfig.font) {
                    config = { ...defaultConfig, ...importedConfig };
                    saveConfig();
                    applyConfig();
                    renderSettings();
                    alert('配置导入成功！');
                } else {
                    alert('配置文件格式无效。');
                }
            } catch (error) {
                alert('导入失败，文件内容不是有效的JSON格式。');
            }
        };
        reader.readAsText(file);
        // Reset file input to allow importing the same file again
        e.target.value = '';
    });
    
    // --- INITIALIZATION ---
    function init() {
        loadConfig();
        applyConfig();
    }

    init();
});