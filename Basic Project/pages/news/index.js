import { Fragment } from "react";
import Link from 'next/link';

function NewsPage() {
  return <Fragment>
    <h1>The News Page</h1>
    <ul>
      <li><Link href='/news/this-course-is-amazing'>This Course Is Amazing</Link></li>
      <li><Link href='/news/something-else'>Something Else</Link></li>
    </ul>
  </Fragment>
};

export default NewsPage;