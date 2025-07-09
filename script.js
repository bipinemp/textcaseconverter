// Text Case Converter Functionality
class TextConverter {
  constructor() {
    this.textInput = document.getElementById("textInput")
    this.textOutput = document.getElementById("textOutput")
    this.copyBtn = document.getElementById("copyBtn")
    this.clearBtn = document.getElementById("clearBtn")
    this.swapBtn = document.getElementById("swapBtn")
    this.charCount = document.getElementById("charCount")
    this.wordCount = document.getElementById("wordCount")
    this.convertButtons = document.querySelectorAll(".convert-btn")

    this.init()
  }

  init() {
    if (!this.textInput) return // Exit if not on converter page

    // Add event listeners
    this.textInput.addEventListener("input", () => this.updateStats())
    this.copyBtn.addEventListener("click", () => this.copyToClipboard())
    this.clearBtn.addEventListener("click", () => this.clearAll())
    this.swapBtn.addEventListener("click", () => this.swapText())

    this.convertButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const caseType = e.target.getAttribute("data-case")
        this.convertText(caseType)
      })
    })

    // Initial stats update
    this.updateStats()
  }

  updateStats() {
    const text = this.textInput.value
    const charCount = text.length
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length

    this.charCount.textContent = `${charCount} characters`
    this.wordCount.textContent = `${wordCount} words`
  }

  convertText(caseType) {
    const inputText = this.textInput.value
    if (!inputText.trim()) return

    let convertedText = ""

    switch (caseType) {
      case "upper":
        convertedText = inputText.toUpperCase()
        break
      case "lower":
        convertedText = inputText.toLowerCase()
        break
      case "title":
        convertedText = this.toTitleCase(inputText)
        break
      case "sentence":
        convertedText = this.toSentenceCase(inputText)
        break
      case "camel":
        convertedText = this.toCamelCase(inputText)
        break
      case "pascal":
        convertedText = this.toPascalCase(inputText)
        break
      case "snake":
        convertedText = this.toSnakeCase(inputText)
        break
      case "kebab":
        convertedText = this.toKebabCase(inputText)
        break
      case "constant":
        convertedText = this.toConstantCase(inputText)
        break
      case "alternating":
        convertedText = this.toAlternatingCase(inputText)
        break
      case "inverse":
        convertedText = this.toInverseCase(inputText)
        break
      case "random":
        convertedText = this.toRandomCase(inputText)
        break
      default:
        convertedText = inputText
    }

    this.textOutput.value = convertedText
  }

  toTitleCase(text) {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  }

  toSentenceCase(text) {
    return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
  }

  toCamelCase(text) {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
      .replace(/\s+/g, "")
      .replace(/[^\w]/g, "")
  }

  toPascalCase(text) {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, "")
      .replace(/[^\w]/g, "")
  }

  toSnakeCase(text) {
    return text
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("_")
  }

  toKebabCase(text) {
    return text
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("-")
  }

  toConstantCase(text) {
    return this.toSnakeCase(text).toUpperCase()
  }

  toAlternatingCase(text) {
    return text
      .split("")
      .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("")
  }

  toInverseCase(text) {
    return text
      .split("")
      .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
      .join("")
  }

  toRandomCase(text) {
    return text
      .split("")
      .map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()))
      .join("")
  }

  async copyToClipboard() {
    const textToCopy = this.textOutput.value
    if (!textToCopy) return

    try {
      await navigator.clipboard.writeText(textToCopy)
      this.showCopyFeedback()
    } catch (err) {
      // Fallback for older browsers
      this.textOutput.select()
      document.execCommand("copy")
      this.showCopyFeedback()
    }
  }

  showCopyFeedback() {
    const originalText = this.copyBtn.innerHTML
    this.copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
            Copied!
        `

    setTimeout(() => {
      this.copyBtn.innerHTML = originalText
    }, 2000)
  }

  clearAll() {
    this.textInput.value = ""
    this.textOutput.value = ""
    this.updateStats()
    this.textInput.focus()
  }

  swapText() {
    const inputText = this.textInput.value
    const outputText = this.textOutput.value

    this.textInput.value = outputText
    this.textOutput.value = inputText
    this.updateStats()
  }
}

// Contact Form Functionality
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm")
    this.init()
  }

  init() {
    if (!this.form) return // Exit if not on contact page

    this.form.addEventListener("submit", (e) => this.handleSubmit(e))

    // Auto-detect browser info
    const browserField = document.getElementById("browser")
    if (browserField && !browserField.value) {
      browserField.value = this.getBrowserInfo()
    }
  }

  getBrowserInfo() {
    const ua = navigator.userAgent
    let browser = "Unknown"

    if (ua.includes("Chrome")) browser = "Chrome"
    else if (ua.includes("Firefox")) browser = "Firefox"
    else if (ua.includes("Safari")) browser = "Safari"
    else if (ua.includes("Edge")) browser = "Edge"

    return `${browser} (${navigator.platform})`
  }

  async handleSubmit(e) {
    e.preventDefault()

    const submitBtn = this.form.querySelector(".submit-btn")
    const btnText = submitBtn.querySelector(".btn-text")
    const btnLoading = submitBtn.querySelector(".btn-loading")
    const messageDiv = document.getElementById("formMessage")

    // Show loading state
    btnText.style.display = "none"
    btnLoading.style.display = "inline"
    submitBtn.disabled = true

    // Simulate form submission (replace with actual endpoint)
    try {
      await this.simulateFormSubmission()
      this.showMessage("Thank you for your message! We'll get back to you soon.", "success")
      this.form.reset()
    } catch (error) {
      this.showMessage("Sorry, there was an error sending your message. Please try again.", "error")
    } finally {
      // Reset button state
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
      submitBtn.disabled = false
    }
  }

  simulateFormSubmission() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000) // Simulate network delay
    })
  }

  showMessage(message, type) {
    const messageDiv = document.getElementById("formMessage")
    messageDiv.textContent = message
    messageDiv.className = `form-message ${type}`
    messageDiv.style.display = "block"

    // Hide message after 5 seconds
    setTimeout(() => {
      messageDiv.style.display = "none"
    }, 5000)
  }
}

// Mobile Navigation
class MobileNav {
  constructor() {
    this.hamburger = document.querySelector(".hamburger")
    this.navMenu = document.querySelector(".nav-menu")
    this.init()
  }

  init() {
    if (!this.hamburger) return

    this.hamburger.addEventListener("click", () => this.toggleMenu())

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => this.closeMenu())
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.closeMenu()
      }
    })
  }

  toggleMenu() {
    this.hamburger.classList.toggle("active")
    this.navMenu.classList.toggle("active")
    document.body.classList.toggle("menu-open")
  }

  closeMenu() {
    this.hamburger.classList.remove("active")
    this.navMenu.classList.remove("active")
    document.body.classList.remove("menu-open")
  }
}

// Blog Category Filter
class BlogFilter {
  constructor() {
    this.categoryLinks = document.querySelectorAll("[data-category]")
    this.blogCards = document.querySelectorAll(".blog-card")
    this.init()
  }

  init() {
    if (!this.categoryLinks.length) return

    this.categoryLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const category = e.target.getAttribute("data-category")
        this.filterPosts(category)
        this.updateActiveCategory(e.target)
      })
    })
  }

  filterPosts(category) {
    this.blogCards.forEach((card) => {
      const cardCategory = card.querySelector(".blog-category").textContent.toLowerCase()

      if (category === "all" || cardCategory === category) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  }

  updateActiveCategory(activeLink) {
    this.categoryLinks.forEach((link) => link.classList.remove("active"))
    activeLink.classList.add("active")
  }
}

// Smooth Scrolling for Anchor Links
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TextConverter()
  new ContactForm()
  new MobileNav()
  new BlogFilter()
  new SmoothScroll()

  // Add loading animation to buttons
  document.querySelectorAll("button, .cta-button").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Add fade-in animation to cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe cards and features for animation
  document.querySelectorAll(".feature-card, .blog-card, .faq-item, .case-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Add CSS for mobile menu (since we can't modify CSS after it's loaded)
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
`

// Inject mobile menu styles
const styleSheet = document.createElement("style")
styleSheet.textContent = mobileMenuStyles
document.head.appendChild(styleSheet)
