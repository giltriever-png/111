import type { Metadata } from "next";
import styles from "./landing.module.css";
import ValuationForm from "./ValuationForm";

export const metadata: Metadata = {
  title: "비상장주식 가치평가 무료 진단 | 가업승계 사전준비",
  description:
    "비상장주식은 시가가 없어 평가 방식에 따라 상속·증여세가 크게 달라집니다. 기본 재무정보 9가지만 입력하시면 세무 전문가가 간이 평가 결과를 회신해 드립니다.",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <div className={styles.brand}>
            스타리치어드바이저<span>·</span>가업승계센터
          </div>
          <a href="#apply" className={styles.headerCta}>
            무료 진단 신청
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>가업승계 사전 준비 · 비상장주식 가치평가</p>
            <h1>
              물려주기 전에
              <br />
              회사의 진짜 가치부터
              <br />
              확인하십시오
            </h1>
            <p className={styles.heroSub}>
              비상장주식은 시가가 없어, 평가 방식에 따라 상속·증여세가 크게 달라집니다. 기본
              재무정보 9가지만 입력하시면, 세무 전문가가 간이 평가 결과를 회신해 드립니다.
            </p>
            <a href="#apply" className={styles.heroCta}>
              10분 만에 정보 입력하기
            </a>
            <p className={styles.heroNote}>
              입력하신 정보는 상담 목적 외 사용되지 않으며, 외부에 공유되지 않습니다.
            </p>
          </div>
          <div className={styles.heroStat}>
            <div className={styles.heroStatNum}>9문항</div>
            <div className={styles.heroStatLabel}>
              재무제표만 준비되면 누구나 채울 수 있는 최소한의 질문
            </div>
          </div>
        </div>
      </section>

      <section className={styles.problems}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2>가치평가 없이 승계를 준비하면 생기는 일</h2>
            <p>
              많은 오너 경영자가 승계 시점에 임박해서야 회사 가치를 확인합니다. 그 때는 이미
              선택지가 줄어든 뒤입니다.
            </p>
          </div>
          <div className={styles.problemList}>
            <div className={styles.problemItem}>
              <h3>예상보다 큰 세금</h3>
              <p>
                순자산가치와 순손익가치를 함께 반영하는 보충적 평가방법상, 최근 3개년 손익
                구조에 따라 평가액이 크게 움직입니다.
              </p>
            </div>
            <div className={styles.problemItem}>
              <h3>사후 정정의 어려움</h3>
              <p>
                신고 이후에 평가 방식을 다시 다투는 것은 사전에 구조를 검토하는 것보다 훨씬
                제한적이고 비용이 큽니다.
              </p>
            </div>
            <div className={styles.problemItem}>
              <h3>승계 시기의 지연</h3>
              <p>
                가치를 모른 채로는 지분 이전 시기와 방법(증여·매매·가업상속공제 등)을 비교할
                기준 자체가 없습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2>진행 방식</h2>
            <p>신청부터 결과 안내까지 세 단계로 진행됩니다.</p>
          </div>
          <div className={styles.processList}>
            <div className={styles.processItem}>
              <div className={styles.processNum}>1</div>
              <div>
                <h3>기본 정보 입력</h3>
                <p>
                  법인 정보와 최근 3개년 재무 수치를 입력합니다. 재무제표만 있으면 5~10분이면
                  충분합니다.
                </p>
              </div>
            </div>
            <div className={styles.processItem}>
              <div className={styles.processNum}>2</div>
              <div>
                <h3>전문가 검토</h3>
                <p>
                  세무사·회계사가 보충적 평가방법 기준으로 순손익가치와 순자산가치를 산출해 간이
                  평가를 진행합니다.
                </p>
              </div>
            </div>
            <div className={styles.processItem}>
              <div className={styles.processNum}>3</div>
              <div>
                <h3>결과 및 상담 안내</h3>
                <p>영업일 기준 2~3일 내로 담당자가 연락드려 평가 결과와 승계 방안을 함께 안내합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trust}>
        <div className={styles.wrap}>
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <strong>세무사·회계사 직접 검토</strong>
              자동 계산기가 아닌, 가업승계 자문 경험을 가진 전문 인력이 직접 수치를 검토합니다.
            </div>
            <div className={styles.trustItem}>
              <strong>비밀유지</strong>
              입력하신 재무정보는 평가 목적으로만 사용되며, 상담 종료 후 처리방침에 따라
              관리됩니다.
            </div>
            <div className={styles.trustItem}>
              <strong>비용 없는 1차 진단</strong>
              간이 평가와 결과 안내까지는 별도 비용이 발생하지 않습니다.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection} id="apply">
        <div className={styles.wrap}>
          <div className={styles.formHead}>
            <h2>비상장주식 가치평가 정보 입력</h2>
            <p>
              아래 항목을 입력하시면 담당 전문가가 확인 후 순서대로 연락드립니다.{" "}
              <span className={styles.req}>*</span> 표시는 필수 입력 항목입니다.
            </p>
          </div>

          <div className={styles.formCard}>
            <ValuationForm />
          </div>
        </div>
      </section>

      <footer>
        <div className={`${styles.wrap} ${styles.footerInner}`}>
          <span>ⓒ 스타리치어드바이저 가업승계센터. 본 페이지는 상담 신청 목적의 예시 페이지입니다.</span>
          <span>개인정보 처리방침 · 상담문의 02-000-0000</span>
        </div>
      </footer>
    </div>
  );
}
