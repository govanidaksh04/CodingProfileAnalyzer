import React, { useState } from "react";
// import Analysis from "./Analysis.jsx";
import { useNavigate } from "react-router-dom";

const InputForm = ({setData}) => {
  const [github, setGithub] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let analyzeButton = document.getElementById("analyze");
    analyzeButton.textContent = "Analyzing...";
    analyzeButton.style.backgroundColor = "#2563eb";
    const res = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({github, leetcode}),
    });
    let analysisData = await res.json();
    console.log(analysisData);
    if(analysisData.status_code == 200){
      setData(analysisData.content.data);
      analyzeButton.innerHTML = "&#10003 Analysed";
      analyzeButton.style.backgroundColor = "#00e68a";
      await sleep(2000);
      navigate("/analysis");
    }
    else{
      alert("Error : " + analysisData.content.error.message);
      window.location.reload();
    }
  };

  return (
    <>
      <div style={{
        backgroundColor: "white",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        padding: "20px",
        width: "360px",
      }}>
      <form
        onSubmit={handleSubmit}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          Enter Your Profiles
        </h2>

        {/* GitHub Input */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
              color: "#161719ff",
              fontWeight: "500",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
              alt="GitHub Logo"
              style={{ width: "20px", height: "20px" }}
            />
            GitHub Username
          </label>
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="e.g. gh_username"
            required
            style={{
              width: "90%",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "14px",
              outline: "none",
              transition: "0.2s",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid #3b82f6")
            }
            onBlur={(e) =>
              (e.target.style.border = "1px solid #d1d5db")
            }
          />
        </div>

        {/* LeetCode Input */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
              color: "#374151",
              fontWeight: "500",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
              alt="LeetCode Logo"
              style={{ width: "20px", height: "20px" }}
            />
            LeetCode Username
          </label>
          <input
            type="text"
            value={leetcode}
            onChange={(e) => setLeetcode(e.target.value)}
            placeholder="e.g. lc_username"
            required
            style={{
              width: "90%",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "14px",
              outline: "none",
              transition: "0.2s",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid #3b82f6")
            }
            onBlur={(e) =>
              (e.target.style.border = "1px solid #d1d5db")
            }
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="analyze"
          style={{
            width: "90%",
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#2563eb")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#3b82f6")
          }
        >
          Analyze
        </button>
      </form>
      </div>
    </>
  );
};

export default InputForm;

