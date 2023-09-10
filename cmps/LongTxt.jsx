
const { useState } = React

export function LongTxt({ txt, length = 40 }) {
  const [isShowMore, setIsShowMore] = useState(false)

  function handleClick() {
    setIsShowMore((prevState) => !prevState)
  }

  function getTxtToShow() {
    if (txt.length < length) return txt
    else {
      if (isShowMore) return txt
      else return txt.substring(0, length) + '...'
    }
  }

  return (
    <div className="mail-body">
      <p>{getTxtToShow()}</p>
    </div>
  )
}
