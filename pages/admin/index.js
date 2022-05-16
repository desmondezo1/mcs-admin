import Head from "next/head";
import Header from "../../components/molecules/Header";
import LoginForm from "../../components/molecules/Login/LoginForm";
import styles from "../../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MCP- Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header>
          <p>Dashboard</p>
        </Header>
        <div className="body_container">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
