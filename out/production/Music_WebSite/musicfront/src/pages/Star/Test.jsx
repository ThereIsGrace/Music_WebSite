import styled from "styled-components"

export function Test() {
    return (
        <StarRateWrap>
            <span className='star_icon'>
                {/* 원래 별 모양은 svg로 잡습니다. 때문에, svg 컬러는 '비어있을 때' 별의 색상을 설정합니다. */}
                <svg xmlns='http://www.w3.org/2000/svg' width='40' height='39' viewBox='0 0 14 13' fill='#cacaca'>
                    {/* clip-path는 임의의 사각형을 만들어 별 위에 덮어주기로 했습니다. */}
                    <clipPath id="firstStarClip">
                        {/* 여기서 width는 svg의 viewBox 기준입니다. width가 14이기 때문에 절반만 채워주고 싶다면 7이 되는 것 입니다. */}
                        <rect width='7' height='39' />
                    </clipPath>
                    <path
                        id='firstStar'
                        d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                        transform='translate(-2 -2)'
                    />
                    {/* clip-path를 사용하기 위한 태그입니다. 채워졌을 때 색상을 설정하면 되고, 각 id를 잘 맞춰 적어주어야 합니다.  */}
                    <use clipPath="url(#firstStarClip)" href="#firstStar" fill='#966fd6'
                    />
                </svg>
            </span>
        </StarRateWrap>
    )
}

const StarRateWrap = styled.div`
        display: flex;
        align-items: center;
        width: 100%;
        margin: 100px 0 0 15px;
        .star_icon {
          display: inline-flex;
          margin-right: 5px;
        }
      
`