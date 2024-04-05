"use client";
import React, { useState } from "react";

const Gpt = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState<any>(null);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleAskQuestion = async () => {
    try {
      const formData = new FormData();
      formData.append("question", inputValue);
      const apiResponse = await fetch("/api/ai", {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        console.error("Server responded with:", errorData);
        throw new Error("Server error");
      }
      const { result } = await apiResponse.json();

      setResponse(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAskQuestion}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="질문을 입력하세요."
        />
        <button type="submit">확인하기</button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default Gpt;
