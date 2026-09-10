"use client";

import { useState, type FormEvent } from "react";
import styles from "./landing.module.css";

const SHEET_ENDPOINT_URL =
  "https://script.google.com/macros/s/AKfycbxSWcTKV4-EHISj6hbBQmcfJWsYZ1bPiTuFK5dweytf-ufyj3FPq_rRLmaUze79Y04/exec";

type FieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  hint?: string;
  type?: string;
  inputMode?: "numeric" | "tel";
  autoComplete?: string;
  full?: boolean;
  validate: (value: string) => boolean;
  error: string;
};

type FieldGroup = {
  title: string;
  fields: FieldConfig[];
};

const numericValidate = (value: string) => /^[0-9,]+$/.test(value.trim());
const signedNumericValidate = (value: string) => /^-?[0-9,]+$/.test(value.trim());

const groups: FieldGroup[] = [
  {
    title: "법인 정보",
    fields: [
      {
        name: "companyName",
        label: "법인명",
        placeholder: "주식회사 한결",
        autoComplete: "organization",
        validate: (v) => v.trim().length > 0,
        error: "법인명을 입력해 주세요.",
      },
      {
        name: "ceoName",
        label: "대표자명",
        placeholder: "홍길동",
        autoComplete: "name",
        validate: (v) => v.trim().length > 0,
        error: "대표자명을 입력해 주세요.",
      },
      {
        name: "totalShares",
        label: "총발행 주식수",
        placeholder: "예: 100,000",
        hint: "단위: 주",
        inputMode: "numeric",
        validate: numericValidate,
        error: "총발행 주식수를 숫자로 입력해 주세요.",
      },
      {
        name: "parValue",
        label: "액면가",
        placeholder: "예: 5,000",
        hint: "단위: 원",
        inputMode: "numeric",
        validate: numericValidate,
        error: "액면가를 숫자로 입력해 주세요.",
      },
    ],
  },
  {
    title: "최근 3개년 당기순이익",
    fields: [
      {
        name: "netIncome23",
        label: "2023년 당기순이익",
        placeholder: "예: 250,000,000",
        hint: "단위: 원 (손실인 경우 앞에 - 표시)",
        inputMode: "numeric",
        validate: signedNumericValidate,
        error: "2023년 당기순이익을 입력해 주세요.",
      },
      {
        name: "netIncome24",
        label: "2024년 당기순이익",
        placeholder: "예: 280,000,000",
        hint: "단위: 원 (손실인 경우 앞에 - 표시)",
        inputMode: "numeric",
        validate: signedNumericValidate,
        error: "2024년 당기순이익을 입력해 주세요.",
      },
      {
        name: "netIncome25",
        label: "2025년 당기순이익",
        placeholder: "예: 300,000,000",
        hint: "단위: 원 (추정치도 가능)",
        inputMode: "numeric",
        validate: signedNumericValidate,
        error: "2025년 당기순이익을 입력해 주세요.",
      },
    ],
  },
  {
    title: "2025년 재무상태",
    fields: [
      {
        name: "totalAssets25",
        label: "2025년 총자산",
        placeholder: "예: 3,500,000,000",
        hint: "단위: 원 (직전 결산 또는 추정 기준)",
        inputMode: "numeric",
        validate: numericValidate,
        error: "2025년 총자산을 입력해 주세요.",
      },
      {
        name: "totalLiabilities25",
        label: "2025년 총부채",
        placeholder: "예: 1,200,000,000",
        hint: "단위: 원",
        inputMode: "numeric",
        validate: numericValidate,
        error: "2025년 총부채를 입력해 주세요.",
      },
    ],
  },
  {
    title: "연락처",
    fields: [
      {
        name: "phone",
        label: "담당자 연락처",
        placeholder: "010-0000-0000",
        type: "tel",
        autoComplete: "tel",
        hint: "평가 결과 및 상담 안내를 위해 사용됩니다.",
        full: true,
        validate: (v) => /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v.trim()),
        error: "연락 가능한 휴대폰 번호를 입력해 주세요.",
      },
    ],
  },
];

const allFields = groups.flatMap((group) => group.fields);

const SUCCESS_TEXT =
  "제출이 완료되었습니다. 담당 전문가가 영업일 기준 2~3일 내 입력하신 연락처로 안내드립니다.";
const ERROR_TEXT =
  "전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주시거나, 담당자에게 직접 연락해 주세요.";

export default function ValuationForm() {
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");

  function handleInputChange(name: string, value: string, validate: (v: string) => boolean) {
    if (!validate(value)) return;
    setInvalidFields((prev) => {
      if (!prev.has(name)) return prev;
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const nextInvalid = new Set<string>();
    for (const field of allFields) {
      const value = String(data.get(field.name) ?? "");
      if (!field.validate(value)) {
        nextInvalid.add(field.name);
      }
    }
    setInvalidFields(nextInvalid);

    if (nextInvalid.size > 0) {
      const firstInvalidName = allFields.find((f) => nextInvalid.has(f.name))?.name;
      if (firstInvalidName) {
        form.querySelector<HTMLInputElement>(`[name="${firstInvalidName}"]`)?.focus();
      }
      setResult("idle");
      return;
    }

    const payload: Record<string, string> = {
      timestamp: new Date().toISOString(),
    };
    for (const field of allFields) {
      payload[field.name] = String(data.get(field.name) ?? "").trim();
    }

    setSubmitting(true);
    try {
      await fetch(SHEET_ENDPOINT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setResult("success");
      form.reset();
    } catch {
      setResult("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="valuation-form" noValidate onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        {groups.map((group) => (
          <FieldGroupFields
            key={group.title}
            group={group}
            invalidFields={invalidFields}
            onFieldChange={handleInputChange}
          />
        ))}
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? "제출 중..." : "정보 제출하고 진단받기"}
        </button>
        <span className={styles.privacyNote}>
          제출 시 개인정보 수집·이용에 동의하는 것으로 간주됩니다.
        </span>
      </div>

      {result !== "idle" && (
        <div
          className={`${styles.successMsg} ${result === "error" ? styles.successMsgError : ""}`}
        >
          {result === "success" ? SUCCESS_TEXT : ERROR_TEXT}
        </div>
      )}
    </form>
  );
}

function FieldGroupFields({
  group,
  invalidFields,
  onFieldChange,
}: {
  group: FieldGroup;
  invalidFields: Set<string>;
  onFieldChange: (name: string, value: string, validate: (v: string) => boolean) => void;
}) {
  return (
    <>
      <div className={styles.groupDivider}>{group.title}</div>
      {group.fields.map((field) => (
        <div
          key={field.name}
          className={`${styles.field} ${field.full ? styles.full : ""} ${
            invalidFields.has(field.name) ? styles.invalid : ""
          }`}
        >
          <label htmlFor={field.name}>
            {field.label}
            <span className={styles.req}>*</span>
          </label>
          <input
            id={field.name}
            type={field.type ?? "text"}
            inputMode={field.inputMode}
            name={field.name}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            onChange={(e) => onFieldChange(field.name, e.target.value, field.validate)}
          />
          {field.hint && <div className={styles.hint}>{field.hint}</div>}
          <div className={styles.fieldError}>{field.error}</div>
        </div>
      ))}
    </>
  );
}
