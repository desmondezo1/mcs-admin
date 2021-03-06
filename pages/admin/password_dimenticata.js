import Head from "next/head";
import Header from "../../components/molecules/Header";
import RecoverPassword from "../../components/molecules/RecoverPassword";
import styles from "../../styles/Home.module.css";

function recoverPassword(props) {
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
          <RecoverPassword />
        </div>
      </main>
    </div>
  );
}

export default recoverPassword;
