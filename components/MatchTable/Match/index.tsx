import Image from "next/image";
import {
  MatchName,
  StartTime,
  Container,
  MatchDetail,
  Detail,
  FlexContainer,
  OddContainer,
  Odd,
} from "./styled";
import type { Props } from "./types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addOrUpdateEvent } from "@/store/coupon/couponSlice";
import { MbBadge } from "@/components/MbBadge/styled";
import { O } from "@/types";

export const Match = ({ event, selectedMatch, index }: Props) => {
  const dispatch = useAppDispatch();
  const { mb, edh, en, iskbet, live } = event;
  const { events } = useAppSelector((state) => state.coupon);

  const checkIsSelected = (o: O) => {
    const currentEvent = events.find((e) => e.bid === event.bid);
    if (!currentEvent) return false;
    return currentEvent.m.odd === o.odd;
  };

  return (
    <Container index={index}>
      <Detail>
        <MbBadge mb={mb} />

        <StartTime>{edh}</StartTime>
        <MatchDetail>
          <MatchName>{en}</MatchName>
          <FlexContainer>
            {iskbet && (
              <Image
                src="/svg/iskbet.svg"
                alt="iskbet"
                width={16}
                height={16}
                priority
              />
            )}
            {live && (
              <Image
                src="/svg/live.svg"
                alt="live"
                width={16}
                height={16}
                priority
              />
            )}
          </FlexContainer>
        </MatchDetail>
      </Detail>

      <OddContainer>
        {selectedMatch?.o.map((m) => (
          <Odd
            isSelected={checkIsSelected(m)}
            onClick={() =>
              dispatch(
                addOrUpdateEvent({
                  sid: event.sid,
                  bid: event.bid,
                  ede: event.ede,
                  edh: event.edh,
                  en: event.en,
                  m: m,
                  mb: event.mb,
                  iskbet: event.iskbet,
                  live: event.live,
                })
              )
            }
            key={m.ov}>
            {m.odd}
          </Odd>
        ))}
      </OddContainer>
    </Container>
  );
};
