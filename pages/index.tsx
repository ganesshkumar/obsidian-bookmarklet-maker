
import React from 'react';
import Head from 'next/head'
// import Header from '../components/Header';
import Usage from '../components/Usage';

type Props = { };
type State = { 
  vault: string
  folder: string
  tags: string
  bookmarklet: string,
  htmlBookmarklet: string
  title: string
  copyText: string,
  htmlCopyText: string
};

class Home extends React.Component<Props, State> {
  private anchor: React.RefObject<HTMLAnchorElement>;

  constructor (props) {
    super(props)

    this.anchor = React.createRef<HTMLAnchorElement>();

    this.state = {
      vault: '',
      folder: '',
      tags: '',
      bookmarklet: '',
      htmlBookmarklet: '',
      title: '',
      copyText: 'Copy JS Clipper',
      htmlCopyText: 'Copy HTML Clipper'
    };
  }

  copyClicked(): void {
    if (navigator) {
      navigator?.clipboard?.writeText(this.state.bookmarklet);
      this.setState({
        copyText: 'Copied!',
        htmlCopyText: 'Copy HTML Clipper'
      });
    }
  }

  htmlCopyClicked(): void {
    if (navigator) {
      navigator?.clipboard?.writeText(this.state.bookmarklet);
      this.setState({
        copyText: 'Copy JS Clipper',
        htmlCopyText: 'Copied!'
      });
    }
  }

  generateClicked(): void {
    const [jsCode, htmlCode] = generateBookmarklet(this.state.title, this.state.vault, this.state.folder, this.state.tags);

    console.log(this.state)
    console.log(this.anchor)

    if (this.anchor.current) {
      this.anchor.current.href = jsCode;
      this.anchor.current.innerText = this.state.title;
  
      // The following ICON doesn't work
      const anchorForIcon: any = this.anchor.current;
      anchorForIcon['ICON'] = ICON;
    }

    this.setState({
      bookmarklet: jsCode,
      htmlBookmarklet: htmlCode,
      copyText: 'Copy JS Clipper',
      htmlCopyText: 'Copy HTML Clipper'
    });
  }

  componentDidMount() {
    console.log(this.anchor.current)
  }

  render() {

    return (
      <div className='container mx-auto'>
        <Head>
          <title>Obsidian Clipper</title>
          <link rel="icon" href="/images/favicon.png" />
          <meta name="description" content="Make Obsidian Clipper or Bookmark"></meta>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "amjl4g2jpl");
            `,
            }}
          />
        </Head>
        <div className='flex-col min-h-screen justify-around'>
          <div className='mt-5 mb-10'>
            <h1 className="text-3xl text-center font-bold text-obsidianInteractive"> Obsidian Clipper Maker </h1>
            <h2 className='text-center text-slate-500 italic'> Make your own Obsidian Clipper</h2>
          </div>
          <div className='md:flex'>
            <div className='flex-col mx-5 w-full md:w-1/3'>
              <div className='my-5'>
                <label htmlFor='title' className='inline-block'>Clipper Name</label>
                <div className='inline-block' title='Name of your Clipper'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 inline-block h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                    type='text'
                    name='title'
                    onChange={e => this.setState({title: e.target.value})}
                    className="my-2 placeholder:italic placeholder:text-slate-500 block bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-obsidianText focus:ring-obsidianInteractiveHover focus:ring-1 sm:text-sm"
                    value={this.state.title}
                    placeholder="My Clipper" />
              </div>
              <div className='my-5'>
                <label htmlFor='vault' className='inline-block'>Vault Name</label>
                <div className='inline-block' title='Name of the Vault to which clipped data should be copied to.'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 inline-block h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                    type='text'
                    name='vault'
                    onChange={e => this.setState({vault: e.target.value})}
                    className="my-2 placeholder:italic placeholder:text-slate-500 block bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-obsidianText focus:ring-obsidianInteractiveHover focus:ring-1 sm:text-sm"
                    value={this.state.vault}
                    placeholder="Vault name" />
              </div>
              <div className='my-5'>
                <label htmlFor='folder' className='inline-block'>Folder Name <span className='text-slate-500 text-sm'>(Optional)</span></label>
                <div className='inline-block' title='Name of the Folder under which clipped data should be placed.'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 inline-block h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input 
                    type='text' 
                    name='folder' 
                    onChange={e => this.setState({folder: e.target.value})}
                    className="my-2 placeholder:italic placeholder:text-slate-500 block bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-obsidianText focus:ring-obsidianInteractiveHover focus:ring-1 sm:text-sm"
                    value={this.state.folder}
                    placeholder="Folder name" />
              </div>
              <div className='my-5'>
                <label htmlFor='tags' className='inline-block'>Tags <span className='text-slate-500 text-sm'>(Optional)</span></label>
                <div className='inline-block' title='List of tags to be included in the new page.'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 inline-block h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input 
                    type='text'
                    name='tags'
                    onChange={e => this.setState({tags: e.target.value})}
                    className="my-2 placeholder:italic placeholder:text-slate-500 block bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-obsidianText focus:ring-obsidianInteractiveHover focus:ring-1 sm:text-sm" 
                    value={this.state.tags}
                    placeholder="Comma separated values" />
              </div>
              <div className='my-5 flex'>
                <button 
                    onClick={_ => this.generateClicked()}
                    className='px-4 py-1 text-sm text-white font-semibold rounded border bg-obsidianInteractiveHover hover:text-white hover:bg-obsidianInteractiveHover hover:border-transparent focus:outline-none focus:ring-2 focus:ring-obsidianInteractiveHover focus:ring-offset-2 rop-shadow-md'>
                  Generate
                </button>
              </div>
            </div>
            <div className='flex-col mx-5 my-5 w-full md:w-2/3'>
              <label className='flex-none' htmlFor='tags'>Generated Javascript Clipper</label>
              <textarea disabled 
                  placeholder='Generated javascript code appears here'
                  className='mt-2 px-3 w-full placeholder:italic placeholder:text-slate-500 border border-slate-300 rounded-md focus:outline-none focus:border-obsidianText focus:ring-obsidianInteractiveHover focus:ring-1'
                  value={this.state.bookmarklet}>
              </textarea>
              <div className='my-5 flex'>
                <button 
                    onClick={() => this.copyClicked()}
                    className='px-4 py-1 text-sm text-white font-semibold rounded border bg-obsidianInteractiveHover hover:text-white hover:bg-obsidianInteractiveHover hover:border-transparent focus:outline-none focus:ring-2 focus:ring-obsidianInteractiveHover focus:ring-offset-2 rop-shadow-md'>
                  {this.state.copyText}
                </button>
              </div>
              <label className='flex-none' htmlFor='tags'>Generated HTML Clipper</label>
              <textarea disabled 
                  placeholder='Generated HTML code appears here'
                  className='mt-2 px-3 w-full placeholder:italic placeholder:text-slate-500 border border-slate-300 rounded-md focus:outline-none focus:border-obsidianText focus:ring-obsidianInteractiveHover focus:ring-1'
                  value={this.state.htmlBookmarklet}>
              </textarea>
              <div className='my-5 flex'>
                <button 
                    onClick={() => this.htmlCopyClicked()}
                    className='px-4 py-1 text-sm text-white font-semibold rounded border bg-obsidianInteractiveHover hover:text-white hover:bg-obsidianInteractiveHover hover:border-transparent focus:outline-none focus:ring-2 focus:ring-obsidianInteractiveHover focus:ring-offset-2 rop-shadow-md'>
                  {this.state.htmlCopyText}
                </button>
              </div>
              <div>
                { this.state.bookmarklet !== '' && 'Drag and drop the following text to the Bookmark/Favorites Bar:' }
                <span className={this.state.bookmarklet ? 'mx-2 rounded border border-purple-600 bg-purple-300 border-1 px-2 py-1': ''}>
                  <a ref={this.anchor} href='#'></a>
                </span>
              </div>
            </div>
          </div>
          <div className='border rounded mt-5 p-3'>
            <Usage />
          </div>

          <div className='my-10 flex justify-center content-center text-xs text-slate-500'>
            <div>
              Created by&nbsp;
              <a href='https://twitter.com/ganesshkumar' rel='noreferrer' target='_blank' className='underline'>ganesshkumar</a>
              &nbsp; | &nbsp; 
            </div>
            <div>
              Find the source code at&nbsp;
              <a href='https://github.com/ganesshkumar/obsidian-bookmarklet-maker' rel='noreferrer' target='_blank' className='underline'>Github</a>  
            </div>
            {/* <div>
              &nbsp;
              <a href="https://www.buymeacoffee.com/ganesshkumar" rel='noreferrer' target='_blank'>Buy Me a Coffee</a>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

function generateBookmarklet (title: string, vault: string, folder: string, tags: string): string[] {
  let jsCode = CODE;
  let processedTags = tags.split(',').map(t => t.trim()).map(t => t.startsWith('#') ? t : `#${t}`).join(' ')

  jsCode = jsCode.replace('VAULTNAME', vault);
  jsCode = jsCode.replace('FOLDERNAME', folder);
  jsCode = jsCode.replace('TAGS', processedTags);

  // var jsCode = `javascript:${encodeURIComponent(`(function(){${jsCode}})();`)}`;
  var htmlCode = `<a href="${jsCode}" ICON="${ICON}">${title}</a>`;

  return [jsCode, htmlCode];
}

const CODE = `javascript:(function()%7Bjavascript%3A%20Promise.all(%5Bimport('https%3A%2F%2Funpkg.com%2Fturndown%406.0.0%3Fmodule')%2C%20import('https%3A%2F%2Funpkg.com%2F%40tehshrike%2Freadability%400.2.0')%2C%20%5D).then(async%20(%5B%7B%0A%20%20%20%20default%3A%20Turndown%0A%7D%2C%20%7B%0A%20%20%20%20default%3A%20Readability%0A%7D%5D)%20%3D%3E%20%7B%0A%0A%20%20%2F*%20Optional%20vault%20name%20*%2F%0A%20%20const%20vault%20%3D%20%22VAULTNAME%22%3B%0A%0A%20%20%2F*%20Optional%20folder%20name%20such%20as%20%22Clippings%2F%22%20*%2F%0A%20%20const%20folder%20%3D%20%22FOLDERNAME%22%3B%0A%0A%20%20%2F*%20Optional%20tags%20%20*%2F%0A%20%20const%20tags%20%3D%20%22TAGS%22%3B%0A%0A%20%20function%20getSelectionHtml()%20%7B%0A%20%20%20%20var%20html%20%3D%20%22%22%3B%0A%20%20%20%20if%20(typeof%20window.getSelection%20!%3D%20%22undefined%22)%20%7B%0A%20%20%20%20%20%20%20%20var%20sel%20%3D%20window.getSelection()%3B%0A%20%20%20%20%20%20%20%20if%20(sel.rangeCount)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20container%20%3D%20document.createElement(%22div%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20for%20(var%20i%20%3D%200%2C%20len%20%3D%20sel.rangeCount%3B%20i%20%3C%20len%3B%20%2B%2Bi)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20container.appendChild(sel.getRangeAt(i).cloneContents())%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20html%20%3D%20container.innerHTML%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%20else%20if%20(typeof%20document.selection%20!%3D%20%22undefined%22)%20%7B%0A%20%20%20%20%20%20%20%20if%20(document.selection.type%20%3D%3D%20%22Text%22)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20html%20%3D%20document.selection.createRange().htmlText%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20return%20html%3B%0A%20%20%7D%0A%0A%20%20const%20selection%20%3D%20getSelectionHtml()%3B%0A%0A%20%20const%20%7B%0A%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20byline%2C%0A%20%20%20%20%20%20content%0A%20%20%7D%20%3D%20new%20Readability(document.cloneNode(true)).parse()%3B%0A%0A%20%20function%20getFileName(fileName)%20%7B%0A%20%20%20%20var%20userAgent%20%3D%20window.navigator.userAgent%2C%0A%20%20%20%20%20%20%20%20platform%20%3D%20window.navigator.platform%2C%0A%20%20%20%20%20%20%20%20windowsPlatforms%20%3D%20%5B'Win32'%2C%20'Win64'%2C%20'Windows'%2C%20'WinCE'%5D%3B%0A%0A%20%20%20%20if%20(windowsPlatforms.indexOf(platform)%20!%3D%3D%20-1)%20%7B%0A%20%20%20%20%20%20fileName%20%3D%20fileName.replace('%3A'%2C%20'').replace(%2F%5B%2F%5C%5C%3F%25*%7C%22%3C%3E%5D%2Fg%2C%20'-')%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20fileName%20%3D%20fileName.replace('%3A'%2C%20'').replace(%2F%5C%2F%2Fg%2C%20'-').replace(%2F%5C%5C%2Fg%2C%20'-')%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20fileName%3B%0A%20%20%7D%0A%20%20const%20fileName%20%3D%20getFileName(title)%3B%0A%0A%20%20if%20(selection)%20%7B%0A%20%20%20%20%20%20var%20markdownify%20%3D%20selection%3B%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20var%20markdownify%20%3D%20content%3B%0A%20%20%7D%0A%0A%20%20if%20(vault)%20%7B%0A%20%20%20%20%20%20var%20vaultName%20%3D%20'%26vault%3D'%20%2B%20encodeURIComponent(%60%24%7Bvault%7D%60)%3B%0A%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20var%20vaultName%20%3D%20''%3B%0A%20%20%7D%0A%0A%20%20const%20markdownBody%20%3D%20new%20Turndown(%7B%0A%20%20%20%20%20%20headingStyle%3A%20'atx'%2C%0A%20%20%20%20%20%20hr%3A%20'---'%2C%0A%20%20%20%20%20%20bulletListMarker%3A%20'-'%2C%0A%20%20%20%20%20%20codeBlockStyle%3A%20'fenced'%2C%0A%20%20%20%20%20%20emDelimiter%3A%20'*'%2C%0A%20%20%7D).turndown(markdownify)%3B%0A%0A%20%20var%20date%20%3D%20new%20Date()%3B%0A%0A%20%20function%20convertDate(date)%20%7B%0A%20%20%20%20var%20yyyy%20%3D%20date.getFullYear().toString()%3B%0A%20%20%20%20var%20mm%20%3D%20(date.getMonth()%2B1).toString()%3B%0A%20%20%20%20var%20dd%20%20%3D%20date.getDate().toString()%3B%0A%20%20%20%20var%20mmChars%20%3D%20mm.split('')%3B%0A%20%20%20%20var%20ddChars%20%3D%20dd.split('')%3B%0A%20%20%20%20return%20yyyy%20%2B%20'-'%20%2B%20(mmChars%5B1%5D%3Fmm%3A%220%22%2BmmChars%5B0%5D)%20%2B%20'-'%20%2B%20(ddChars%5B1%5D%3Fdd%3A%220%22%2BddChars%5B0%5D)%3B%0A%20%20%7D%0A%0A%20%20const%20today%20%3D%20convertDate(date)%3B%0A%0A%20%20const%20fileContent%20%3D%20%0A%20%20%20%20%20%20%22author%3A%3A%20%22%20%2B%20byline%20%2B%20%22%5Cn%22%0A%20%20%20%20%20%20%2B%20%22source%3A%3A%20%5B%22%20%2B%20title%20%2B%20%22%5D(%22%20%2B%20document.URL%20%2B%20%22)%5Cn%22%0A%20%20%20%20%20%20%2B%20%22clipped%3A%3A%20%5B%5B%22%20%2B%20today%20%2B%20%22%5D%5D%5Cn%22%0A%20%20%20%20%20%20%2B%20%22published%3A%3A%20%5Cn%5Cn%22%20%0A%20%20%20%20%20%20%2B%20tags%20%2B%20%22%5Cn%5Cn%22%0A%20%20%20%20%20%20%2B%20markdownBody%20%3B%0A%20%20%0A%20%20document.location.href%20%3D%20%22obsidian%3A%2F%2Fnew%3F%22%0A%20%20%20%20%2B%20%22file%3D%22%20%2B%20encodeURIComponent(folder%20%2B%20'%2F'%20%2B%20fileName)%0A%20%20%20%20%2B%20%22%26content%3D%22%20%2B%20encodeURIComponent(fileContent)%0A%20%20%20%20%2B%20vaultName%20%3B%0A%7D)%7D)()%3B`
const ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1klEQVQ4jZ2TP2gTYRjGn++7uyStTUmVTgZbK3ZoIreIUF2ikzqJcI6dXNwcBHE7ncVFiqKjW5wciqClFBxdHCyFZnDwT5Nc/xByd8nd9937OkRrvKQp9Afv9jy/d3lf4Ehc6ThV4+jcACx6czwOipXy68r9pbUnzK4cJjQPKfNN+9W8GMs9arXaS2dn5+WnlaseIJ67YOlC0MCmHq4EXFo8t3y5MJVfYcjC6eIpsm2bCidz4cQJ68rtu/mvf5cAgEwJGAAiFTwU0iyUSnPdC+WyCMKQdhp6srbl3QMAx6ke9PoFAgBfmnt2UenkRrE4TTMzs9nAD0GKhFYJd/zoGwDg7b9Sn6BnJeZbljFu1euNxG+H0AlYaTI6oY9Y8yYAlODwEMEdAgCt+Z0QSu/t75uNZhOAhIoTGUWR6nZFDQBciGECMADx5fuDz0TJR0Pk8Gt7O4miGESSlSZP1uOffdkBAQBXAEDcVS8gSbT9FvZ2d0kiA63U1tMPdoAUaQEBwMbO6ntmvWnKcdPz6orISFRMtT8ZOUIA9K5tXVvZzGMI/hF0grHAD03Dym0AgOMs/Hc7I2+9srA8kclmrucnp65NnznvvnxjN0fl0xz7kVJUDQeHv/NvsTvM6kLUHJkAAAAASUVORK5CYII=";

export default Home;
