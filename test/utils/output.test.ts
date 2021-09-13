import * as path from 'path'
import generateOutput from '../../src/utils/output'
const invalidJsonOutput = require('../data/invalidRegex.json')
const invalidTableOutput = require('../data/tableData.json')
const regexMessages = require('../../messages/index.json').validateRegex

jest.mock('fs')

describe('Generate Output after Stack is Processed', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('Filepath Flag is not set & Invalid Regex is found', async () => {
    const resultFile = 'results.csv'
    const storagePath = path.resolve(__dirname, '../../', resultFile)
    const consoleSpy = jest.spyOn(console, 'log')
    await generateOutput({}, invalidJsonOutput, invalidTableOutput)
    expect(consoleSpy).toHaveBeenCalledTimes(4)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.tableOutput)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.csvOutput, storagePath)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.docsLink)
  })

  test('Filepath Flag is set & Invalid Regex is found', async () => {
    const flags = {
      filePath: '/path/to/output/directory/',
    }
    const resultFile = 'results.csv'
    const storagePath = flags.filePath + resultFile
    const consoleSpy = jest.spyOn(console, 'log')
    await generateOutput(flags, invalidJsonOutput, invalidTableOutput)
    expect(consoleSpy).toHaveBeenCalledTimes(4)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.tableOutput)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.csvOutput, storagePath)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.docsLink)
  })

  test('Invalid Regex is not found', async () => {
    const consoleSpy = jest.spyOn(console, 'log')
    await generateOutput({}, [], [])
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.noInvalidRegex)
  })
})
