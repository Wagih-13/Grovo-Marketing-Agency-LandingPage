"use client";

import { useState, useRef } from "react";
import { Check } from "lucide-react";

export function ColophonSection() {
  const [screen, setScreen] = useState<"cta" | "form" | "success">("cta");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    followers: "",
    sales: "",
    budget: "",
    problem: "",
    name: "",
    brand: "",
    phone: "",
    email: "",
    instagram: "",
  });
  const [flashedFields, setFlashedFields] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFlash = (fields: string[]) => {
    setFlashedFields(fields);
    setTimeout(() => setFlashedFields([]), 1200);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.followers) {
        handleFlash(["followers"]);
        return;
      }
    } else if (step === 2) {
      if (!formData.sales) {
        handleFlash(["sales"]);
        return;
      }
    } else if (step === 3) {
      if (!formData.budget) {
        handleFlash(["budget"]);
        return;
      }
    } else if (step === 5) {
      const empty = [];
      if (!formData.name) empty.push("name");
      if (!formData.brand) empty.push("brand");
      if (!formData.phone) empty.push("phone");
      if (empty.length > 0) {
        handleFlash(empty);
        return;
      }
      // Send email and then show success screen
      sendEmail();
      return;
    }
    if (step < 5) setStep(step + 1);
  };

  const sendEmail = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setScreen("success");
      } else {
        console.error("Failed to send email:", data.error);
        alert(`Failed to send your request: ${data.error}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (screen === "cta") {
    return (
      <section
        id="contact"
        className="relative py-32 px-6 md:px-12 flex items-center justify-center min-h-screen"
      >
        <div className="w-full max-w-md text-center">
          <div
            style={{
              color: "#FF6B00",
              fontSize: "13px",
              letterSpacing: "3px",
              marginBottom: "24px",
              fontWeight: 600,
            }}
          >
            GROVO
          </div>
          <h2
            style={{
              color: "white",
              fontSize: "42px",
              fontWeight: 700,
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Be The Next Brand We Scale
          </h2>
          <p
            style={{ color: "#888888", fontSize: "15px", marginBottom: "32px" }}
          >
            Book your free consultation — takes less than 2 minutes
          </p>
          <button
            onClick={() => setScreen("form")}
            style={{
              background: "#FF6B00",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "13px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              width: "100%",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#E65C00")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FF6B00")}
          >
            Start Now →
          </button>
        </div>
      </section>
    );
  }

  if (screen === "form") {
    const progressWidth = (step / 5) * 100;

    return (
      <section className="relative py-32 px-6 md:px-12 flex items-center justify-center min-h-screen">
        <div
          style={{
            background: "#0A0A0A",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "12px",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Progress Bar */}
          <div
            style={{
              height: "3px",
              background: "#1A1A1A",
              marginBottom: "32px",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressWidth}%`,
                background: "#FF6B00",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <div
                style={{
                  color: "#FF6B00",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  marginBottom: "20px",
                  fontWeight: 600,
                }}
              >
                QUESTION 1 OF 5
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 500,
                  marginBottom: "24px",
                }}
              >
                How many Instagram followers does your brand have?
              </h3>
              <div style={{ marginBottom: "32px" }}>
                <select
                  value={formData.followers}
                  onChange={(e) =>
                    setFormData({ ...formData, followers: e.target.value })
                  }
                  style={{
                    background: "#1A1A1A",
                    border: flashedFields.includes("followers")
                      ? "1px solid #FF6B00"
                      : "1px solid #2B2B2B",
                    color: "white",
                    fontSize: "15px",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    width: "100%",
                    appearance: "none",
                    cursor: "pointer",
                    transition: flashedFields.includes("followers")
                      ? "none"
                      : "border-color 0.2s",
                  }}
                >
                  <option value="">Select followers range</option>
                  <option value="under-1k">Less than 1,000</option>
                  <option value="1k-10k">1,000 – 10,000</option>
                  <option value="10k-50k">10,000 – 50,000</option>
                  <option value="50k-200k">50,000 – 200,000</option>
                  <option value="200k-plus">More than 200,000</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleNext}
                  style={{
                    background: "#FF6B00",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "13px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    flex: 1,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#E65C00")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#FF6B00")
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div
                style={{
                  color: "#FF6B00",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  marginBottom: "20px",
                  fontWeight: 600,
                }}
              >
                QUESTION 2 OF 5
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 500,
                  marginBottom: "24px",
                }}
              >
                What are your approximate monthly sales right now?
              </h3>
              <div style={{ marginBottom: "32px" }}>
                <select
                  value={formData.sales}
                  onChange={(e) =>
                    setFormData({ ...formData, sales: e.target.value })
                  }
                  style={{
                    background: "#1A1A1A",
                    border: flashedFields.includes("sales")
                      ? "1px solid #FF6B00"
                      : "1px solid #2B2B2B",
                    color: "white",
                    fontSize: "15px",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    width: "100%",
                    appearance: "none",
                    cursor: "pointer",
                    transition: flashedFields.includes("sales")
                      ? "none"
                      : "border-color 0.2s",
                  }}
                >
                  <option value="">Select sales range</option>
                  <option value="zero">Not started yet — zero sales</option>
                  <option value="under-10k">Less than 10,000 EGP</option>
                  <option value="10k-50k">10,000 – 50,000 EGP</option>
                  <option value="50k-150k">50,000 – 150,000 EGP</option>
                  <option value="150k-500k">150,000 – 500,000 EGP</option>
                  <option value="500k-plus">More than 500,000 EGP</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleBack}
                  style={{
                    background: "transparent",
                    color: "#888888",
                    border: "1px solid #2B2B2B",
                    borderRadius: "8px",
                    padding: "13px 18px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#555555";
                    e.currentTarget.style.color = "#CCCCCC";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2B2B2B";
                    e.currentTarget.style.color = "#888888";
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    background: "#FF6B00",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "13px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    flex: 1,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#E65C00")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#FF6B00")
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <div
                style={{
                  color: "#FF6B00",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  marginBottom: "20px",
                  fontWeight: 600,
                }}
              >
                QUESTION 3 OF 5
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 500,
                  marginBottom: "24px",
                }}
              >
                What is your monthly paid ads budget?
              </h3>
              <div style={{ marginBottom: "32px" }}>
                <select
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  style={{
                    background: "#1A1A1A",
                    border: flashedFields.includes("budget")
                      ? "1px solid #FF6B00"
                      : "1px solid #2B2B2B",
                    color: "white",
                    fontSize: "15px",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    width: "100%",
                    appearance: "none",
                    cursor: "pointer",
                    transition: flashedFields.includes("budget")
                      ? "none"
                      : "border-color 0.2s",
                  }}
                >
                  <option value="">Select budget range</option>
                  <option value="none">Not running ads right now</option>
                  <option value="under-3k">Less than 3,000 EGP</option>
                  <option value="3k-10k">3,000 – 10,000 EGP</option>
                  <option value="10k-30k">10,000 – 30,000 EGP</option>
                  <option value="30k-100k">30,000 – 100,000 EGP</option>
                  <option value="100k-plus">More than 100,000 EGP</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleBack}
                  style={{
                    background: "transparent",
                    color: "#888888",
                    border: "1px solid #2B2B2B",
                    borderRadius: "8px",
                    padding: "13px 18px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#555555";
                    e.currentTarget.style.color = "#CCCCCC";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2B2B2B";
                    e.currentTarget.style.color = "#888888";
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    background: "#FF6B00",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "13px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    flex: 1,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#E65C00")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#FF6B00")
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <div
                style={{
                  color: "#FF6B00",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  marginBottom: "20px",
                  fontWeight: 600,
                }}
              >
                QUESTION 4 OF 5
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                Is there a specific problem affecting your brand right now?
              </h3>
              <p
                style={{
                  color: "#666666",
                  fontSize: "13px",
                  marginBottom: "24px",
                }}
              >
                Optional — the more context you share, the better we can help
              </p>
              <div style={{ marginBottom: "32px" }}>
                <textarea
                  value={formData.problem}
                  onChange={(e) =>
                    setFormData({ ...formData, problem: e.target.value })
                  }
                  placeholder="e.g. Ads are running but no sales, creatives not getting engagement..."
                  style={{
                    background: "#1A1A1A",
                    border: "1px solid #2B2B2B",
                    color: "white",
                    fontSize: "15px",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    width: "100%",
                    minHeight: "120px",
                    fontFamily: "inherit",
                    resize: "none",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#FF6B00")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#2B2B2B")
                  }
                />
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleBack}
                  style={{
                    background: "transparent",
                    color: "#888888",
                    border: "1px solid #2B2B2B",
                    borderRadius: "8px",
                    padding: "13px 18px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#555555";
                    e.currentTarget.style.color = "#CCCCCC";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2B2B2B";
                    e.currentTarget.style.color = "#888888";
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    background: "#FF6B00",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "13px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    flex: 1,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#E65C00")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#FF6B00")
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div>
              <div
                style={{
                  color: "#FF6B00",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  marginBottom: "20px",
                  fontWeight: 600,
                }}
              >
                QUESTION 5 OF 5
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 500,
                  marginBottom: "24px",
                }}
              >
                Your details so we can reach you
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                <div>
                  <label
                    style={{
                      color: "#888888",
                      fontSize: "13px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    style={{
                      background: "#1A1A1A",
                      border: flashedFields.includes("name")
                        ? "1px solid #FF6B00"
                        : "1px solid #2B2B2B",
                      color: "white",
                      fontSize: "15px",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      width: "100%",
                      transition: flashedFields.includes("name")
                        ? "none"
                        : "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#FF6B00")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        flashedFields.includes("name") ? "#FF6B00" : "#2B2B2B")
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      color: "#888888",
                      fontSize: "13px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Brand name
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    style={{
                      background: "#1A1A1A",
                      border: flashedFields.includes("brand")
                        ? "1px solid #FF6B00"
                        : "1px solid #2B2B2B",
                      color: "white",
                      fontSize: "15px",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      width: "100%",
                      transition: flashedFields.includes("brand")
                        ? "none"
                        : "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#FF6B00")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        flashedFields.includes("brand") ? "#FF6B00" : "#2B2B2B")
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      color: "#888888",
                      fontSize: "13px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Instagram page link
                  </label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/yourbrand"
                    style={{
                      background: "#1A1A1A",
                      border: "1px solid #2B2B2B",
                      color: "white",
                      fontSize: "15px",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#FF6B00")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "#2B2B2B")
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      color: "#888888",
                      fontSize: "13px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    WhatsApp number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+20 1XX XXX XXXX"
                    style={{
                      background: "#1A1A1A",
                      border: flashedFields.includes("phone")
                        ? "1px solid #FF6B00"
                        : "1px solid #2B2B2B",
                      color: "white",
                      fontSize: "15px",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      width: "100%",
                      transition: flashedFields.includes("phone")
                        ? "none"
                        : "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#FF6B00")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        flashedFields.includes("phone") ? "#FF6B00" : "#2B2B2B")
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      color: "#888888",
                      fontSize: "13px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@brand.com"
                    style={{
                      background: "#1A1A1A",
                      border: "1px solid #2B2B2B",
                      color: "white",
                      fontSize: "15px",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#FF6B00")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "#2B2B2B")
                    }
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleBack}
                  style={{
                    background: "transparent",
                    color: "#888888",
                    border: "1px solid #2B2B2B",
                    borderRadius: "8px",
                    padding: "13px 18px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#555555";
                    e.currentTarget.style.color = "#CCCCCC";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2B2B2B";
                    e.currentTarget.style.color = "#888888";
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  style={{
                    background: "#FF6B00",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "13px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    flex: 1,
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) =>
                    !isSubmitting &&
                    (e.currentTarget.style.background = "#E65C00")
                  }
                  onMouseLeave={(e) =>
                    !isSubmitting &&
                    (e.currentTarget.style.background = "#FF6B00")
                  }
                >
                  {isSubmitting ? "Sending..." : "Send Request ✓"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (screen === "success") {
    return (
      <section className="relative py-32 px-6 md:px-12 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md text-center">
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(255, 107, 0, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <Check
              style={{ color: "#FF6B00", width: "28px", height: "28px" }}
            />
          </div>
          <h2
            style={{
              color: "white",
              fontSize: "28px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            Request received!
          </h2>
          <p
            style={{ color: "#888888", fontSize: "15px", marginBottom: "32px" }}
          >
            We will contact you within 24 hours to schedule your free
            consultation.
          </p>
          <p style={{ color: "#FF6B00", fontSize: "13px", fontWeight: 600 }}>
            Scale with Strategy. Grow with Precision.
          </p>
        </div>
      </section>
    );
  }
}
