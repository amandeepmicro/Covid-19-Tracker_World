import React, { useEffect } from "react";
import $ from "jquery";
import "../css/Progress.scss";
export default function Progress({ text, total, type, ...props }) {
  const calPercentage = (totalNum, typeNum) => {
    //console.log(totalNum,typeNum)
    return Math.ceil((typeNum / totalNum) * 100);
  };

  var $progress = $(`.progress.${text}`),
    $bar = $(`.progress__bar.${text}`),
    $text = $(`.progress__text.${text}`),
    percent = 0,
    speed = 1000,
    start = 0,
    orange = 15,
    yellow = 35,
    green = 55,
    timer;

  //console.log($progress,$bar,$text)

  const update = (stopper, id) => {
    setTimeout(function () {
      // console.log(stopper,percent,id)
      if (stopper === percent) {
        //console.log('cleared')
        clearTimeout(id);
      } else {
        percent = percent + 1;

        $text.find("em").text(percent + "%");

        if (text === "Active") {
          if (percent >= green) {
            $bar.addClass("progress__bar--green");
          } else if (percent >= yellow) {
            $bar.addClass("progress__bar--yellow");
          } else if (percent >= orange) {
            $bar.addClass("progress__bar--orange");
          }

          $bar.css({ width: percent + "%" });
          speed = 100;
          update(stopper, id);
        }

        if (text === "Recovery") {
          if (percent >= green) {
            $bar.addClass("progress__bar--green");
          } else if (percent >= yellow) {
            $bar.addClass("progress__bar--yellow");
          } else if (percent >= orange) {
            $bar.addClass("progress__bar--orange");
          }

          $bar.css({ width: percent + "%" });
          speed = 100;
          update(stopper, id);
        }

        if (text === "Death") {
          if (percent >= green) {
            $bar.addClass("progress__bar--green");
          } else if (percent >= yellow) {
            $bar.addClass("progress__bar--yellow");
          } else if (percent >= orange) {
            $bar.addClass("progress__bar--orange");
          }

          $bar.css({ width: percent + "%" });
          speed = 100;
          update(stopper, id);
        }
      }
    }, speed);
  };

  //console.log(text,total,type)
  useEffect(() => {
    if (total && type) {
      let stopper = parseInt(calPercentage(total, type));
      //console.log(stopper)

      let id = setTimeout(function () {
        $progress.addClass("progress--active");
        //console.log('called update')
        update(stopper, id);
      }, 1000);
    }
    //console.log(timer_start)
    return () => {
      if (total && type) {
        $text.find("em").text(0 + "%");
        $bar.css({ width: 0 + "%" });
        $progress.removeClass("progress--active");
        $bar.removeClass("progress__bar--green progress__bar--yellow progress__bar--orange");
      }
    };
  }, [type, total]);

  return (
    <div>
      <div className={`progress ${text}`}>
        <b className={`progress__bar ${text}`}>
          <span className={`progress__text ${text}`}>
            {text}: <em>0%</em>
          </span>
        </b>
      </div>
    </div>
  );
}
