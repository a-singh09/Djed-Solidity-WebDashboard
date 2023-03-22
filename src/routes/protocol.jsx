import React from "react";
//import { ArrowRightOutlined, PropertySafetyFilled } from "@ant-design/icons";
//import { ReactComponent as Metamask } from "../images/metamask.svg";
//import CustomButton from "../components/atoms/CustomButton/CustomButton";
import MetamaskConnectButton from "../components/molecules/MetamaskConnectButton/MetamaskConnectButton";
import CoinCard from "../components/molecules/CoinCard/CoinCard";

import "./_protocol.scss";
import ReservesCard from "../components/molecules/ReservesCard/ReservesCard";
import { useAppProvider } from "../context/AppProvider";
import {
  getBcUsdEquivalent,
  getRcUsdEquivalent,
  getScAdaEquivalent
} from "../utils/helpers";

export default function Protocol() {
  const { coinsDetails, systemParams } = useAppProvider();

  const scFloat = parseFloat(coinsDetails?.scaledNumberSc.replaceAll(",", ""));
  const scConverted = getScAdaEquivalent(coinsDetails, scFloat);

  const rcFloat = parseFloat(coinsDetails?.scaledNumberRc.replaceAll(",", ""));
  const rcConverted = getRcUsdEquivalent(coinsDetails, rcFloat);

  const bcFloat = parseFloat(coinsDetails?.scaledReserveBc.replaceAll(",", ""));
  const bcConverted = getBcUsdEquivalent(coinsDetails, bcFloat);

  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="ProtocolSection">
        <div className="Left">
          <h1>
            <strong>Djed on Milkomeda C1</strong>
          </h1>
          <div className="DescriptionContainer">
            <p>
              Djed is a formally verified crypto-backed autonomous stablecoin protocol. It
              has been researched since Q2 2020, its whitepaper has been released in
              August 2021, and it has multiple{" "}
              <a href="https://github.com/DjedAlliance" target="_blank">
                implementations
              </a>{" "}
              and{" "}
              <a href="https://docs.djed.one/implementations-and-deployments/deployments" target="_blank">
                deployments
              </a>
              . Here you can interact with a{" "}
              <a
                href={`${process.env.REACT_APP_MILKOMEDA_C1_EXPLORER}/address/${process.env.REACT_APP_DJED_ADDRESS}`}
                target="_blank"
              >
                deployment
              </a>{" "}
              that uses{" "}
              <a
                href="https://github.com/DjedAlliance/Djed-Solidity/commits/Belus"
                target="_blank"
              >
                these smart contracts
              </a>{" "}
              on Milkomeda C1.
            </p>
            <p>
              Milkomeda C1 is the EVM-compatible chain of the Cardano ecosystem. Its
              native currency is mADA, a bridged version of Cardano's ADA. This asset is
              used by the Djed protocol to back <a href="/sc">StableCoins</a> and{" "}
              <a href="/rc">ReserveCoins</a> and it is needed to buy any of these coins
              and to pay for transaction fees on Milkomeda C1.
            </p>
            <p>
              To learn more about how to obtain mADA or bridge your ADA from Cardano to
              Milkomeda C1, follow{" "}
              <a
                href="https://dcspark.github.io/milkomeda-documentation/cardano/for-end-users/obtaining-milkada"
                target="_blank"
                rel="noopener noreferrer"
              >
                this guide
              </a>
              .
            </p>
            <p>
              This deployment is immutable, unstoppable, fully autonomous and
              zero-governance. No one is able to change the deployed code or the
              parameters of the deployment. No one is operating it. No one controls your
              funds. Treat it as a foreign non-territorial self-sovereign
              autonomous monetary authority whose currency follows a
              self-driving monetary policy.
            </p>
          </div>
          <MetamaskConnectButton />
        </div>
        <div className="Right">
          <h2 className="SubtTitle">
            <strong>Protocol</strong> Status
          </h2>
          <div className="CoinsContainer">
            <CoinCard
              coinIcon="/coin-icon-one.png"
              coinName="Djed StableCoin"
              priceAmount={coinsDetails?.scaledPriceSc} //"0.31152640"
              circulatingAmount={coinsDetails?.scaledNumberSc} //"1,345,402.15"
              tokenName="Djed StableCoin"
              equivalence={scConverted}
            />
            <CoinCard
              coinIcon="/coin-icon-two.png"
              coinName="Djed ReserveCoin"
              priceAmount={coinsDetails?.scaledBuyPriceRc} //"0.31152640"
              sellPriceAmount={coinsDetails?.scaledSellPriceRc}
              circulatingAmount={coinsDetails?.scaledNumberRc} //"1,345,402.15"
              tokenName="Djed ReserveCoin"
              equivalence={rcConverted}
            />
            <ReservesCard
              priceAmount={coinsDetails?.scaledReserveBc}
              equivalence={bcConverted}
              coinIcon="/coin-icon-three.png"
              coinName="Reserves"
              reserveRatio={coinsDetails?.percentReserveRatio}
              reserveRatioMin={systemParams?.reserveRatioMin}
              reserveRatioMax={systemParams?.reserveRatioMax}
              showCurrentReserveRatio={Number(coinsDetails?.unscaledNumberSc) > 0}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
