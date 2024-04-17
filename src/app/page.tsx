"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5vw;
`;

const Input = styled.input`
  width: 50vw;
  height: 50vh;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 10vw;
  height: 5vh;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Div = styled.div`
  width: 50vw;
  height: 20vh;
  margin-left: 5vw;
  background-color: beige;
`;

const Gpt = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [data, setData] = useState(null);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleAskQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/hello');
          if (!response.ok) {
            throw new Error('API request failed');
          }
          const responseData = await response.json();
          setData(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

  return (
    <div>
      <Form onSubmit={handleAskQuestion}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="질문을 입력하세요."
        />
        <Button type="submit">확인하기</Button>
      </Form>
      <Div>{response}</Div>
      <div>
      {data ? (
        <p>{data.message}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default Gpt;
