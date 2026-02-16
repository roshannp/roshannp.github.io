/* ===========================================
   CYBERSECURITY PORTFOLIO - INTERACTIVE ENGINE
   Matrix Rain | Terminal | Glitch | Boot Seq
   =========================================== */

document.addEventListener("DOMContentLoaded", function () {
    // ===== CONSOLE GREETING =====
    console.log("%c[*] Initializing Security Portfolio...", "color: #00ff41; font-size: 14px; font-weight: bold;");
    console.log("%c[!] WARNING: Unauthorized access is prohibited.", "color: #ef4444; font-size: 12px;");
    console.log("%c[+] Welcome to Roshan's Cyber Domain", "color: #00d4ff; font-size: 12px;");

    // ===== MATRIX RAIN =====
    const canvas = document.getElementById("matrix-rain");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|!@#$%^&*";
        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = "rgba(10, 14, 23, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00ff41";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);

        window.addEventListener("resize", () => {
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        });
    }

    // ===== BOOT SEQUENCE =====
    const bootScreen = document.getElementById("boot-screen");
    const bootLog = document.getElementById("boot-log");
    const bootBar = document.getElementById("boot-bar");
    const navbar = document.getElementById("navbar");

    const bootMessages = [
        { text: "[    0.000000] BIOS-provided physical RAM map:", type: "info" },
        { text: "[    0.001234] Kernel: security_module=apparmor", type: "info" },
        { text: "[    0.002345] Loading cybersecurity modules...", type: "info" },
        { text: "[  OK  ] Loaded: firewall_engine.ko", type: "ok" },
        { text: "[  OK  ] Loaded: intrusion_detection.ko", type: "ok" },
        { text: "[  OK  ] Loaded: crypto_module.ko", type: "ok" },
        { text: "[  OK  ] Loaded: network_monitor.ko", type: "ok" },
        { text: "[WARN ] Vulnerability scanner armed", type: "warn" },
        { text: "[  OK  ] Initialized: penetration_toolkit", type: "ok" },
        { text: "[  OK  ] TLS 1.3 handshake protocol ready", type: "ok" },
        { text: "[  OK  ] AES-256 encryption engine online", type: "ok" },
        { text: "[  OK  ] Loading Roshan's portfolio...", type: "ok" },
        { text: "[  OK  ] All systems operational. Welcome.", type: "ok" },
    ];

    let bootSkipped = false;

    function skipBoot() {
        if (bootSkipped) return;
        bootSkipped = true;
        bootScreen.classList.add("hidden");
        navbar.classList.add("visible");
        setTimeout(() => bootScreen.remove(), 600);
    }

    // Skip on click or keypress
    document.addEventListener("keydown", skipBoot, { once: true });
    bootScreen.addEventListener("click", skipBoot);

    async function runBoot() {
        for (let i = 0; i < bootMessages.length; i++) {
            if (bootSkipped) return;

            const msg = bootMessages[i];
            const line = document.createElement("div");
            line.className = `log-line log-${msg.type}`;
            line.textContent = msg.text;
            bootLog.appendChild(line);
            bootLog.scrollTop = bootLog.scrollHeight;

            // Update progress bar
            const progress = ((i + 1) / bootMessages.length) * 100;
            bootBar.style.width = progress + "%";

            await sleep(150 + Math.random() * 100);
        }

        await sleep(500);
        if (!bootSkipped) skipBoot();
    }

    runBoot();

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // ===== TYPED TEXT EFFECT =====
    const typedElement = document.getElementById("typed-text");
    const phrases = [
        "Penetration Tester // OSCP+",
        "Red Team & Blue Team Operator",
        "Network Security Engineer",
        "Vulnerability Researcher",
        "CTF Player // HackTheBox Top 2%",
        "CyberDefenders US Top 100",
        "Breaking and Securing Systems",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeText() {
        if (!typedElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText();

    // ===== COUNTER ANIMATION =====
    const statValues = document.querySelectorAll(".stat-value[data-count]");

    function animateCounters() {
        statValues.forEach((el) => {
            const target = parseInt(el.getAttribute("data-count"));
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // ===== INTERACTIVE TERMINAL =====
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");
    const terminalBody = document.getElementById("terminal-body");
    const clearTerminalBtn = document.getElementById("clear-terminal");
    const fullscreenTerminalBtn = document.getElementById("fullscreen-terminal");
    const terminalWindow = document.getElementById("terminal-window");

    // Command history
    let commandHistory = [];
    let historyIndex = -1;

    // Terminal data
    const terminalData = {
        whoami: `
  ╔═══════════════════════════════════════════╗
  ║  Roshan Nellore Prasad                    ║
  ║  Security Engineer @ Medline Industries   ║
  ║  M.S. Cybersecurity - CU Boulder          ║
  ║  OSCP+ | CEH | Security+                 ║
  ╚═══════════════════════════════════════════╝`,

        help: `
  Available Commands:
  ──────────────────────────────────
  <span class="highlight">whoami</span>       - Display identity info
  <span class="highlight">skills</span>       - List security skills
  <span class="highlight">experience</span>   - Show work experience
  <span class="highlight">projects</span>    - List completed projects
  <span class="highlight">certs</span>        - Show certifications
  <span class="highlight">education</span>    - Display education
  <span class="highlight">contact</span>      - Get contact info
  <span class="highlight">social</span>       - Social media links
  <span class="highlight">blogs</span>        - View blog posts
  <span class="highlight">achievements</span> - Show accomplishments
  <span class="highlight">tools</span>        - Security toolkit
  <span class="highlight">hack</span>         - Try to hack the system ;)
  <span class="highlight">matrix</span>       - Toggle matrix rain
  <span class="highlight">neofetch</span>     - System information
  <span class="highlight">banner</span>       - Show ASCII banner
  <span class="highlight">clear</span>        - Clear terminal
  <span class="highlight">exit</span>         - Close terminal
  ──────────────────────────────────`,

        skills: `
  ┌─ RED TEAM // Offensive ─────────────────┐
  │ ► Penetration Testing        [████████░] │
  │ ► Web App Exploitation       [████████░] │
  │ ► Privilege Escalation       [███████░░] │
  │ ► Network Exploitation       [████████░] │
  │ ► Reverse Engineering        [███████░░] │
  └─────────────────────────────────────────┘
  ┌─ BLUE TEAM // Defensive ────────────────┐
  │ ► Network Security           [████████░] │
  │ ► SIEM & Log Analysis        [████████░] │
  │ ► Firewall Management        [████████░] │
  │ ► Incident Response          [███████░░] │
  │ ► Cloud Security (AWS)       [███████░░] │
  └─────────────────────────────────────────┘`,

        experience: `
  ┌─ CAREER TIMELINE ──────────────────────────────────────┐
  │                                                         │
  │  [ACTIVE] Security Engineer                             │
  │           Medline Industries | Feb 2024 - Present       │
  │           ► Custom Burp Suite extension - 60% less      │
  │             manual testing                              │
  │           ► GenAI prompt-injection scanner - 87%        │
  │             detection accuracy                          │
  │           ► Zero Trust controls - 99% fewer incidents  │
  │           ► Reduced external attack surface by 65%     │
  │                                                         │
  │  [======] Security Engineer - R&D                       │
  │           Dish Network | Jun 2023 - Jan 2024            │
  │           ► HashiCorp Vault + Terraform on AWS          │
  │           ► Automated data pipelines - 60% faster       │
  │           ► Snyk integration - 30% vuln reduction       │
  │                                                         │
  │  [======] Security Engineer Intern - R&D                │
  │           Dish Network | May 2022 - Aug 2022            │
  │           ► Python OCR solution - 40% accuracy gain     │
  │           ► App security testing - 20% risk reduction   │
  │                                                         │
  │  [======] Security Analyst Intern                       │
  │           Evervantage | Apr 2020 - May 2021             │
  └─────────────────────────────────────────────────────────┘`,

        projects: `
  ┌─ MISSION LOG ────────────────────────────────────┐
  │                                                   │
  │  [OPS-000] AM I SECURE — Attack Surface Scanner   │
  │            Recon | SSL | Headers | CVE | DNS      │
  │            <span class="highlight">roshannp.github.io/amisecure</span>        │
  │            STATUS: LIVE                           │
  │                                                   │
  │  [OPS-001] Buggy Web-App Exploitation             │
  │            OWASP Top 10 | Burp Suite | Nmap       │
  │            github.com/roshannp/Web-Application-   │
  │            Pentesting                             │
  │                                                   │
  │  [OPS-002] Data Carver & Password Cracker         │
  │            Python | Hex Analysis | Hash Cracking  │
  │            github.com/roshannp/Digital-Forensics  │
  │                                                   │
  │  [OPS-003] Reentrancy Attack Analysis             │
  │            Solidity | Blockchain | Smart Contracts│
  │            github.com/roshannp/Reentrancy         │
  │                                                   │
  │  [OPS-004] Ad Blocker Privacy Evaluation          │
  │            Privacy | Performance | Research       │
  │            github.com/roshannp/Ad-Blockers-       │
  │            Efficiency                             │
  │                                                   │
  │  [OPS-005] Impromptwo - Secure Web Platform       │
  │            JWT Auth | REST API | Full Stack       │
  │            github.com/roshannp/Impromptwo         │
  │                                                   │
  │  [OPS-006] Privacy-Preserving Data Pipeline       │
  │            AWS | Lambda | Athena                  │
  │            github.com/roshannp/AWS-Projects       │
  └──────────────────────────────────────────────────┘`,

        certs: `
  ┌─ BADGES UNLOCKED ──────────────────────────────┐
  │                                                  │
  │  🛡️  OSCP+ (Offensive Security)      [2025]     │
  │      Offensive Security Certified Professional   │
  │                                                  │
  │  🔓  CEH (EC-Council)                [2023]     │
  │      Certified Ethical Hacker                    │
  │                                                  │
  │  🔐  Security+ (CompTIA)             [2023]     │
  │      CompTIA Security+                           │
  └────────────────────────────────────────────────┘`,

        education: `
  ┌─ TRAINING GROUNDS ────────────────────────┐
  │                                            │
  │  🎓 University of Colorado Boulder         │
  │     M.S. in Cybersecurity Engineering      │
  │     August 2021 - May 2023                 │
  │                                            │
  │  🎓 Anna University, Chennai               │
  │     B.E. in Computer Science               │
  │     August 2017 - May 2021                 │
  └────────────────────────────────────────────┘`,

        contact: `
  ┌─ ESTABLISH CONNECTION ──────────────────────┐
  │                                              │
  │  📧 Email:    np.roshan@outlook.com          │
  │  💼 LinkedIn: linkedin.com/in/roshannp       │
  │  🐙 GitHub:   github.com/roshannp            │
  └──────────────────────────────────────────────┘`,

        social: `
  ┌─ SOCIAL LINKS ──────────────────────────────┐
  │                                              │
  │  GitHub:         github.com/roshannp         │
  │  LinkedIn:       linkedin.com/in/roshannp    │
  │  HackTheBox:     Top 2% globally             │
  │  TryHackMe:      tryhackme.com/p/rone7552    │
  │  CyberDefenders: US Top 100                  │
  │  LeetCode:       leetcode.com/u/rone7552     │
  └──────────────────────────────────────────────┘`,

        blogs: `
  ┌─ WRITE-UPS & BLOGS ─────────────────────────┐
  │                                              │
  │  [BLOG-001] Logspector CLI                   │
  │             Threat Log Analyzer              │
  │                                              │
  │  [BLOG-002] OSCP Study Notes                 │
  │             Comprehensive prep guide         │
  │                                              │
  │  [BLOG-003] OWASP TOP 10 Notes              │
  │             LLMs, Web App, APIs              │
  └──────────────────────────────────────────────┘`,

        achievements: `
  ┌─ ACCOMPLISHMENTS ───────────────────────────┐
  │                                              │
  │  🏆 Best Intern - Dish Network (2022)        │
  │     DISH-CPAW Award among 75 interns        │
  │                                              │
  │  🎓 Amy Barnes Frey Fellowship (2023)        │
  │     University of Colorado Boulder           │
  │                                              │
  │  📄 Published: IoT Blockchain Research       │
  │     IRJET, 2020                              │
  └──────────────────────────────────────────────┘`,

        tools: `
  ┌─ SECURITY TOOLKIT ──────────────────────────┐
  │                                              │
  │  Offensive:  Burp Suite, Metasploit, Nmap,   │
  │              SQLmap, Kali Linux, Hashcat,     │
  │              Ghidra, BloodHound              │
  │                                              │
  │  Defensive:  Checkpoint, Palo Alto, Splunk,  │
  │              HashiCorp Vault, Zscaler,        │
  │              Illumio, Snyk, AWS Security      │
  │                                              │
  │  Dev/Ops:    Python, Bash, JavaScript,       │
  │              Docker, Kubernetes, Terraform,   │
  │              AWS Lambda, Git                  │
  └──────────────────────────────────────────────┘`,

        neofetch: `
          .--.          <span class="highlight">roshan</span>@<span class="highlight">kali</span>
         |o_o |         ─────────────
         |:_/ |         OS: CyberSec Portfolio v2.0
        //   \\ \\        Host: GitHub Pages
       (|     | )       Kernel: Security-First
      /'\\_   _/\`\\       Shell: /bin/zsh
      \\___)=(___/       Resolution: Adaptive
                        Theme: Hacker [dark]
                        Icons: FontAwesome 6
                        Terminal: Interactive v1.0
                        CPU: Caffeine-Powered
                        Memory: OSCP+ | CEH | Sec+
                        Uptime: Since 2020`,
    };

    const bannerArt = `
 ██▀███   ▒█████    ██████  ██░ ██  ▄▄▄       ███▄    █ 
▓██ ▒ ██▒▒██▒  ██▒▒██    ▒ ▓██░ ██▒▒████▄     ██ ▀█   █ 
▓██ ░▄█ ▒▒██░  ██▒░ ▓██▄   ▒██▀▀██░▒██  ▀█▄  ▓██  ▀█ ██▒
▒██▀▀█▄  ▒██   ██░  ▒   ██▒░▓█ ░██ ░██▄▄▄▄██ ▓██▒  ▐▌██▒
░██▓ ▒██▒░ ████▓▒░▒██████▒▒░▓█▒░██▓ ▓█   ▓██▒▒██░   ▓██░
░ ▒▓ ░▒▓░░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░ ▒ ░░▒░▒ ▒▒   ▓▒█░░ ▒░   ▒ ▒ 
  ░▒ ░ ▒░  ░ ▒ ▒░ ░ ░▒  ░ ░ ▒ ░▒░ ░ ▒   ▒▒ ░░ ░░   ░ ▒░
  ░░   ░ ░ ░ ░ ▒  ░  ░  ░   ░  ░░ ░ ░   ▒      ░   ░ ░ 
   ░         ░ ░        ░   ░  ░  ░     ░  ░         ░ 
                Security Engineer // OSCP+`;

    // Hack Easter egg responses
    const hackResponses = [
        "  [!] ACCESS DENIED: Nice try, but you'll need more than that.",
        "  [!] IDS ALERT: Suspicious activity detected from your IP.",
        "  [!] HONEYPOT TRIGGERED: Your attempt has been logged.",
        "  [!] WAF BLOCKED: Request flagged as malicious.",
        "  [!] ALERT: Looks like someone's been studying OWASP ;)",
        "  [!] INTRUSION DETECTED: But I appreciate the effort!",
    ];

    // Welcome message
    function showWelcome() {
        addOutput(
            `  Welcome to Roshan's Interactive Terminal!
  ──────────────────────────────────────────
  Type <span class="highlight">help</span> to see available commands.
  Use ↑/↓ arrow keys for command history.
  ──────────────────────────────────────────`,
            "info"
        );
    }

    showWelcome();

    function addOutput(text, type = "response") {
        const line = document.createElement("div");
        line.className = `terminal-output-line ${type}`;
        line.innerHTML = text;
        terminalOutput.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function addCommandLine(cmd) {
        const line = document.createElement("div");
        line.className = "terminal-output-line command";
        line.innerHTML = `<span class="prompt-user">roshan</span>@<span class="prompt-host">kali</span>:<span class="prompt-path">~</span>$ ${cmd}`;
        terminalOutput.appendChild(line);
    }

    function processCommand(cmd) {
        const trimmedCmd = cmd.trim().toLowerCase();

        addCommandLine(cmd);

        if (!trimmedCmd) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
            return;
        }

        // Add to history
        commandHistory.unshift(trimmedCmd);
        if (commandHistory.length > 50) commandHistory.pop();
        historyIndex = -1;

        // Process command
        if (terminalData[trimmedCmd]) {
            if (trimmedCmd === "neofetch" || trimmedCmd === "help") {
                addOutput(terminalData[trimmedCmd], "info");
            } else {
                addOutput(terminalData[trimmedCmd], "response");
            }
        } else if (trimmedCmd === "clear") {
            terminalOutput.innerHTML = "";
        } else if (trimmedCmd === "banner") {
            addOutput(bannerArt, "ascii");
        } else if (trimmedCmd === "hack" || trimmedCmd === "exploit" || trimmedCmd === "pwn") {
            const response = hackResponses[Math.floor(Math.random() * hackResponses.length)];
            addOutput(response, "error");
        } else if (trimmedCmd === "matrix") {
            const matrixCanvas = document.getElementById("matrix-rain");
            if (matrixCanvas) {
                const current = parseFloat(matrixCanvas.style.opacity) || 0.07;
                matrixCanvas.style.opacity = current > 0.1 ? "0.07" : "0.25";
                addOutput("  [*] Matrix rain intensity toggled.", "success");
            }
        } else if (trimmedCmd === "exit" || trimmedCmd === "quit") {
            addOutput("  [*] Closing session... Just kidding, you can't escape!", "info");
        } else if (trimmedCmd === "sudo" || trimmedCmd.startsWith("sudo ")) {
            addOutput("  [!] Nice try. Root access denied on this system.", "error");
        } else if (trimmedCmd === "ls") {
            addOutput("  projects/  experience/  certs/  blogs/  contact.txt  README.md", "response");
        } else if (trimmedCmd === "pwd") {
            addOutput("  /home/roshan/portfolio", "response");
        } else if (trimmedCmd === "date") {
            addOutput(`  ${new Date().toString()}`, "response");
        } else if (trimmedCmd === "uname" || trimmedCmd === "uname -a") {
            addOutput("  CyberSec Portfolio v2.0 (Security-First Kernel) x86_64", "response");
        } else if (trimmedCmd === "ping" || trimmedCmd.startsWith("ping ")) {
            addOutput("  PING roshan.security (127.0.0.1): 56 data bytes\n  64 bytes: icmp_seq=0 ttl=64 time=0.042ms\n  --- Secure connection established ---", "success");
        } else if (trimmedCmd === "cat readme.md" || trimmedCmd === "cat readme") {
            addOutput("  Roshan Nellore Prasad - Security Engineer\n  Passionate about Offensive & Defensive Security.\n  Type 'help' for more info.", "response");
        } else if (trimmedCmd === "history") {
            const historyText = commandHistory.slice(0, 10).map((cmd, i) => `  ${i + 1}  ${cmd}`).join("\n");
            addOutput(historyText || "  No commands in history.", "response");
        } else if (trimmedCmd === "echo" || trimmedCmd.startsWith("echo ")) {
            const msg = cmd.trim().substring(5);
            addOutput(`  ${msg || ""}`, "response");
        } else if (trimmedCmd === "id") {
            addOutput("  uid=1337(roshan) gid=1337(security) groups=1337(security),27(sudo),100(users)", "response");
        } else if (trimmedCmd === "hostname") {
            addOutput("  roshan-security-portfolio", "response");
        } else if (trimmedCmd === "uptime") {
            addOutput("  up since 2020, building and breaking systems", "response");
        } else if (trimmedCmd === "ifconfig" || trimmedCmd === "ip a") {
            addOutput("  eth0: 10.10.14.x/24 scope global\n  tun0: 10.10.10.x/24 scope vpn (HackTheBox)", "response");
        } else if (trimmedCmd === "nmap" || trimmedCmd.startsWith("nmap ")) {
            addOutput("  Starting Nmap 7.94SVN\n  PORT     STATE  SERVICE\n  22/tcp   open   ssh\n  80/tcp   open   http\n  443/tcp  open   https\n  \n  Nmap done: 1 IP address (1 host up) scanned", "info");
        } else {
            addOutput(`  bash: ${trimmedCmd}: command not found. Type <span class="highlight">help</span> for available commands.`, "error");
        }
    }

    // Terminal input handler
    if (terminalInput) {
        terminalInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                const cmd = this.value;
                this.value = "";
                processCommand(cmd);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    this.value = commandHistory[historyIndex];
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    this.value = commandHistory[historyIndex];
                } else {
                    historyIndex = -1;
                    this.value = "";
                }
            } else if (e.key === "Tab") {
                e.preventDefault();
                const partial = this.value.trim().toLowerCase();
                const commands = Object.keys(terminalData).concat([
                    "clear", "banner", "hack", "matrix", "exit", "ls", "pwd",
                    "date", "uname", "ping", "history", "echo", "id", "hostname",
                    "uptime", "ifconfig", "nmap", "sudo",
                ]);
                const matches = commands.filter((c) => c.startsWith(partial));
                if (matches.length === 1) {
                    this.value = matches[0];
                } else if (matches.length > 1) {
                    addCommandLine(partial);
                    addOutput("  " + matches.join("  "), "info");
                }
            }
        });

        // Focus terminal on click
        terminalBody.addEventListener("click", () => terminalInput.focus());
    }

    // Clear terminal button
    if (clearTerminalBtn) {
        clearTerminalBtn.addEventListener("click", () => {
            terminalOutput.innerHTML = "";
            showWelcome();
        });
    }

    // Fullscreen terminal
    if (fullscreenTerminalBtn) {
        fullscreenTerminalBtn.addEventListener("click", () => {
            terminalWindow.classList.toggle("fullscreen");
            const icon = fullscreenTerminalBtn.querySelector("i");
            if (terminalWindow.classList.contains("fullscreen")) {
                icon.className = "fas fa-compress";
                document.body.style.overflow = "hidden";
            } else {
                icon.className = "fas fa-expand";
                document.body.style.overflow = "";
            }
        });
    }

    // Exit fullscreen on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && terminalWindow && terminalWindow.classList.contains("fullscreen")) {
            terminalWindow.classList.remove("fullscreen");
            const icon = fullscreenTerminalBtn.querySelector("i");
            icon.className = "fas fa-expand";
            document.body.style.overflow = "";
        }
    });

    // ===== NAVIGATION =====
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const body = document.body;

    // Mobile menu overlay
    const mobileOverlay = document.createElement("div");
    mobileOverlay.className = "mobile-menu-overlay";
    body.appendChild(mobileOverlay);

    function toggleMobileMenu() {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
        mobileOverlay.classList.toggle("active");
        body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMobileMenu);
    }

    mobileOverlay.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) toggleMobileMenu();
    });

    // Close menu on link click
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) toggleMobileMenu();
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });

    // ===== NAVBAR SCROLL BEHAVIOR =====
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        // Scrolled state
        if (currentScroll > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Hide/show on scroll
        if (currentScroll <= 0) {
            navbar.style.transform = "";
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "";
        }

        lastScroll = currentScroll;
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.className = "scroll-to-top";
    scrollTopBtn.innerHTML = "↑";
    scrollTopBtn.setAttribute("aria-label", "Scroll to top");
    body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = "1";
            scrollTopBtn.style.visibility = "visible";
        } else {
            scrollTopBtn.style.opacity = "0";
            scrollTopBtn.style.visibility = "hidden";
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ===== INTERSECTION OBSERVER =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");

                // Animate skill bars
                if (entry.target.classList.contains("skill-bar-item")) {
                    const percent = entry.target.getAttribute("data-skill");
                    const fill = entry.target.querySelector(".skill-fill");
                    if (fill) {
                        setTimeout(() => {
                            fill.style.width = percent + "%";
                        }, 200);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll(
        ".mission-card, .timeline-item, .edu-card, .cert-card, .achievement-card, .skill-bar-item, .arsenal-category, .connect-card, .blog-card-cyber"
    ).forEach((el) => observer.observe(el));

    // Counter animation trigger
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        counterObserver.observe(heroSection);
    }

    // ===== ACTIVE SECTION HIGHLIGHTING =====
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function setActiveSection() {
        const scrollY = window.scrollY + 200;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollY >= top && scrollY < top + height) {
                navItems.forEach((item) => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${id}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", setActiveSection);

    // ===== PARTICLE EFFECT IN HERO =====
    const particleContainer = document.getElementById("particles");
    if (particleContainer) {
        function createParticle() {
            const particle = document.createElement("div");
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${Math.random() > 0.5 ? "#00ff41" : "#00d4ff"};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.1};
                animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
                pointer-events: none;
            `;
            particleContainer.appendChild(particle);

            // Remove excess particles
            if (particleContainer.children.length > 50) {
                particleContainer.removeChild(particleContainer.firstChild);
            }
        }

        // Create initial particles
        for (let i = 0; i < 30; i++) {
            createParticle();
        }

        // Add particles over time
        setInterval(createParticle, 2000);

        // Add floating animation
        const style = document.createElement("style");
        style.textContent = `
            @keyframes floatParticle {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 0.5; }
                90% { opacity: 0.3; }
                100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== GLITCH HOVER EFFECT =====
    document.querySelectorAll(".glitch-hover").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            el.style.animation = "none";
            el.offsetHeight; // trigger reflow
            el.style.animation = "";
        });
    });

    // ===== EASTER EGG: Konami Code =====
    const konamiCode = [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
        "b", "a",
    ];
    let konamiIndex = 0;

    document.addEventListener("keydown", (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                // Activate rainbow matrix
                const matrixCanvas = document.getElementById("matrix-rain");
                if (matrixCanvas) {
                    matrixCanvas.style.opacity = "0.3";
                    matrixCanvas.style.filter = "hue-rotate(90deg)";
                    setTimeout(() => {
                        matrixCanvas.style.filter = "";
                        matrixCanvas.style.opacity = "0.07";
                    }, 5000);
                }
                // Show easter egg message
                if (terminalOutput) {
                    addOutput("\n  🎮 KONAMI CODE ACTIVATED! You found the easter egg!", "success");
                    addOutput("  [*] Matrix rain boosted for 5 seconds...\n", "info");
                }
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Log completion
    console.log("%c[+] All systems initialized successfully.", "color: #00ff41; font-size: 12px;");
});
